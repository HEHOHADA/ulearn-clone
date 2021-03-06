﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models.Tasks.CodeTasks;
using UlearnServices.Models.Tasks.CodeTasks;

namespace UlearnServices.Services.CodeTasks
{
    public class CodeTaskResultService
    {
        private readonly ApplicationDbContext _context;

        public CodeTaskResultService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Confirm(string userId, CodeTaskResultDto model)
        {
            var user = await _context.Users
                .Include(x => x.UserGroups)
                .ThenInclude(x => x.Group)
                .FirstOrDefaultAsync(x => x.Id == userId);
            var result = new CodeTaskResult
            {
                Code = model.Code,
                Group = user.UserGroups != null && user.UserGroups.Count > 0 ? user.UserGroups[0].Group : null,
                CodeTask = await _context.CodeTasks.FindAsync(model.CodeTaskId),
                Sender = user
            };

            if (result.Sender == null || result.CodeTask == null)
            {
                throw new ArgumentException();
            }

            _context.CodeTaskResults.Add(result);
            await _context.SaveChangesAsync();
        }

        public async Task<CodeTaskResult> GetByTaskId(string userId, int taskId)
        {
            return await _context.CodeTaskResults
                .Include(x => x.Sender)
                .Include(x => x.Review)
                .Include(x => x.CodeTask)
                .OrderByDescending(x => x.Id)
                .FirstOrDefaultAsync(x => x.CodeTask.Id == taskId &&
                                          x.Sender != null && x.Sender.Id == userId);
        }

        public async Task<CodeTaskResultViewDto> GetForReview(int codeTaskResultId)
        {
            var codeTaskResult = await _context.CodeTaskResults
                .Include(x => x.Sender)
                .Include(x => x.CodeTask)
                .FirstOrDefaultAsync(x => x.Id == codeTaskResultId);
            return new CodeTaskResultViewDto()
            {
                Id = codeTaskResult.Id,
                Code = codeTaskResult.Code,
                Email = codeTaskResult.Sender.Email,
                Points = codeTaskResult.CodeTask.Points
            };
        }

        public async Task DoReview(int codeTaskResultId, string userId, CodeTaskForReviewDto model)
        {
            var review = new CodeTaskReview
            {
                Result = await _context.CodeTaskResults.FindAsync(codeTaskResultId),
                Teacher = await _context.Users.FindAsync(userId),
                Text = model.Text
            };

            await _context.CodeTaskReviews.AddAsync(review);
            await _context.SaveChangesAsync();
        }

        public async Task<List<CodeTaskResultPartialDto>> GetGroupResults(int groupId)
        {
            return await _context.CodeTaskResults
                .Include(x => x.Group)
                .Include(x => x.Sender)
                .Include(x => x.CodeTask)
                .Where(x => x.Group != null && x.Group.Id == groupId)
                .Select(x => new CodeTaskResultPartialDto
                {
                    Email = x.Sender.Email,
                    Task = x.CodeTask.Name,
                    Id = x.Id,
                    Points = x.CodeTask.Points
                })
                .ToListAsync();
        }
    }
}