using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models.Tasks.VideoTask;

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

        public async Task<VideoTask> CreateAsync(int moduleId, VideoTask videoTask)
        {
            var module = await _context.Modules.FindAsync(moduleId);
            videoTask.Module = module;
            _context.VideoTasks.Add(videoTask);
            await _context.SaveChangesAsync();
            return videoTask;
        }

        public async Task PutAsync(VideoTask videoTask)
        {
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