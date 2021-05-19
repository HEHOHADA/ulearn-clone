using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models.Tasks.VideoTasks;
using UlearnServices.Models.Tasks.VideoTasks;

namespace UlearnServices.Services.VideoTasks
{
    public class VideoTaskResultService
    {
        private readonly ApplicationDbContext _context;

        public VideoTaskResultService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Confirm(string userId, VideoTaskResultDto model)
        {
            var user = await _context.Users
                .Include(x => x.UserGroups)
                .ThenInclude(x => x.Group)
                .FirstOrDefaultAsync(x => x.Id == userId);
            var result = new VideoTaskResult()
            {
                Group = user.UserGroups != null && user.UserGroups.Count > 0 ? user.UserGroups[0].Group : null,
                VideoTask = await _context.VideoTasks.FindAsync(model.VideoTaskId),
                Sender = user
            };

            if (result.Sender == null || result.VideoTask == null)
            {
                throw new ArgumentException();
            }
            
            _context.VideoTaskResults.Add(result);
            await _context.SaveChangesAsync();
        }

        public async Task<VideoTaskResult> GetByTaskId(string userId, int taskId)
        {
            return await _context.VideoTaskResults
                .Include(x => x.Sender)
                .Include(x => x.VideoTask)
                .OrderByDescending(x => x.Id)
                .FirstOrDefaultAsync(x => x.VideoTask.Id == taskId && 
                                          x.Sender!= null && x.Sender.Id == userId);
        }
    }
}