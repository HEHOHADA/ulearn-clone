using System;
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
                                          x.Sender!= null && x.Sender.Id == userId);
        }
    }
}