using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;

namespace UlearnServices.Services
{
    public class ModulesService
    {
        private readonly ApplicationDbContext _context;

        public ModulesService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool ModuleExists(int id)
        {
            return _context.Modules.Any(e => e.Id == id);
        }

        public async Task<List<Module>> GetAsync()
        {
            return await _context.Modules
                .Include(module => module.TestTasks)
                .Include(module => module.CodeTasks)
                .Include(module => module.VideoTasks)
                .ToListAsync();
        }

        public async Task<Module> FindAsync(int id)
        {
            return await _context.Modules
                .Include(module => module.TestTasks)
                .Include(module => module.CodeTasks)
                .Include(module => module.VideoTasks)
                .FirstOrDefaultAsync(module => module.Id == id);
        }

        public async Task<Module> CreateAsync(int courseId, Module module)
        {
            var course = await _context.Courses.FindAsync(courseId);
            module.Course = course;
            _context.Modules.Add(module);
            await _context.SaveChangesAsync();
            return module;
        }

        public async Task PutAsync(Module module)
        {
            _context.Entry(module).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Remove(Module module)
        {
            _context.Modules.Remove(module);
            await _context.SaveChangesAsync();
        }
    }
}