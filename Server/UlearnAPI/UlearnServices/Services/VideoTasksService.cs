using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models.Tasks.VideoTask;
using UlearnServices.Models.Tasks.VideoTask;

namespace UlearnServices.Services
{
    public class VideoTasksService
    {
        private readonly ApplicationDbContext _context;

        public VideoTasksService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool VideoTaskExists(int id)
        {
            return _context.VideoTasks.Any(e => e.Id == id);
        }

        public async Task<List<VideoTask>> GetAsync()
        {
            return await _context.VideoTasks.ToListAsync();
        }

        public async Task<VideoTask> FindAsync(int id)
        {
            return await _context.VideoTasks.FindAsync(id);
        }

        public async Task<VideoTask> CreateAsync(VideoTaskDto model)
        {
            var videoTask = new VideoTask
            {
                Name = model.Name,
                Description = model.Description,
                VideoHref = model.VideoHref,
                Module = await _context.Modules.FindAsync(model.ModuleId)
            };

            _context.VideoTasks.Add(videoTask);
            await _context.SaveChangesAsync();
            return videoTask;
        }

        public async Task PutAsync(int id, VideoTaskDto model)
        {
            var videoTask = await _context.VideoTasks.FindAsync(id);
            videoTask.Name = model.Name;
            videoTask.Description = model.Description;
            videoTask.VideoHref = model.VideoHref;
            videoTask.Module = await _context.Modules.FindAsync(model.ModuleId);
            
            _context.Entry(videoTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Remove(VideoTask videoTask)
        {
            _context.VideoTasks.Remove(videoTask);
            await _context.SaveChangesAsync();
        }
    }
}