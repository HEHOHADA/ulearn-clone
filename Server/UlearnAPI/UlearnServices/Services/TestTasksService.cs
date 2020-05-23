using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;
using UlearnData.Models.Tasks.TestTask;

namespace UlearnServices.Services
{
    public class TestTasksService
    {
        private readonly ApplicationDbContext _context;

        public TestTasksService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool TestTaskExists(int id)
        {
            return _context.TestTasks.Any(e => e.Id == id);
        }

        public async Task<List<TestTask>> GetAsync()
        {
            return await _context.TestTasks
                .Include(testTask => testTask.Questions)
                    .ThenInclude(question => question.Answers)
                .ToListAsync();
        }

        public async Task<TestTask> FindAsync(int id)
        {
            return await _context.TestTasks
                .Include(testTask => testTask.Questions)
                    .ThenInclude(question => question.Answers)
                .FirstOrDefaultAsync(module => module.Id == id);
        }

        public async Task<TestTask> CreateAsync(TestTask testTask)
        {
            _context.TestTasks.Add(testTask);
            await _context.SaveChangesAsync();
            return testTask;
        }

        public async Task PutAsync(TestTask testTask)
        {
            _context.Entry(testTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Remove(TestTask testTask)
        {
            _context.TestTasks.Remove(testTask);
            await _context.SaveChangesAsync();
        }

        public async Task<List<TestQuestionAnswerResult>> GetResults(int taskId, int groupId, string userId)
        {
            return await _context.QuestionAnswerResults
                .Include(result => result.Sender)
                .Include(result => result.Group)
                .Where(result => result.Group.Id == groupId && result.Sender.Id == userId)
                .ToListAsync();
        }
    }
}