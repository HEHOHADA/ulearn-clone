using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models.Tasks.CodeTask;

namespace UlearnServices.Services
{
    public class CodeTasksService
    {
        private readonly ApplicationDbContext _context;

        public CodeTasksService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool CodeTaskExists(int id)
        {
            return _context.CodeTasks.Any(e => e.Id == id);
        }

        public async Task<List<CodeTask>> GetAsync()
        {
            return await _context.CodeTasks.ToListAsync();
        }

        public async Task<CodeTask> FindAsync(int id)
        {
            return await _context.CodeTasks.FindAsync(id);
        }

        public async Task<CodeTask> CreateAsync(int moduleId, CodeTask codeTask)
        {
            var module = await _context.Modules.FindAsync(moduleId);
            codeTask.Module = module;
            _context.CodeTasks.Add(codeTask);
            await _context.SaveChangesAsync();
            return codeTask;
        }

        public async Task PutAsync(CodeTask codeTask)
        {
            _context.Entry(codeTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Remove(CodeTask codeTask)
        {
            _context.CodeTasks.Remove(codeTask);
            await _context.SaveChangesAsync();
        }
        
        public async Task<List<CodeTaskResult>> GetResults(int taskId, int groupId, string userId)
        {
            return await _context.CodeTaskResults
                .Include(result => result.Sender)
                .Include(result => result.Group)
                .Where(result => result.Group.Id == groupId && result.Sender.Id == userId)
                .ToListAsync();
        }
    }
}