using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models.Tasks.TestTasks;
using UlearnServices.Models.Tasks.TestTasks;

namespace UlearnServices.Services.TestTasks
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

        public async Task<TestTask> CreateAsync(TestTaskDto model)
        {
            var testTask = new TestTask
            {
                Name = model.Name,
                Description = model.Description,
                Module = await _context.Modules.FindAsync(model.moduleId),
                Questions = model.Questions
                    .Select(x => new TestQuestion
                    {
                        Text = x.Text,
                        Points = x.Points,
                        Answers = x.Answers
                            .Select(y => new TestQuestionAnswer
                            {
                                Text = y.Text,
                                IsRight = y.IsRight
                            })
                            .ToList()
                    })
                    .ToList()
            };
            testTask.Points = testTask.Questions.Select(x => x.Points).Aggregate((x, y) => x + y);

            _context.TestTasks.Add(testTask);
            await _context.SaveChangesAsync();
            return testTask;
        }

        public async Task PutAsync(int id, TestTaskDto model)
        {
            var testTask = await _context.TestTasks.FindAsync(id);
            testTask.Name = model.Name;
            testTask.Description = model.Description;
            testTask.Module = await _context.Modules.FindAsync(model.moduleId);
            testTask.Questions = model.Questions
                .Select(x => new TestQuestion
                {
                    Text = x.Text,
                    Points = x.Points,
                    Answers = x.Answers
                        .Select(y => new TestQuestionAnswer
                        {
                            Text = y.Text,
                            IsRight = y.IsRight
                        })
                        .ToList()
                })
                .ToList();
            testTask.Points = testTask.Questions.Select(x => x.Points).Aggregate((x, y) => x + y);

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