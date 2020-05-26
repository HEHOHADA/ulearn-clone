using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models.Tasks.TestTasks;
using UlearnServices.Models.Tasks.TestTasks;

namespace UlearnServices.Services.TestTasks
{
    public class TestTaskResultService
    {
        private readonly ApplicationDbContext _context;

        public TestTaskResultService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TestTaskResult> GetByTaskId(string userId, int taskId)
        {
            return await _context.TestTaskResults
                .Include(x => x.Sender)
                .Include(x => x.Task)
                .FirstOrDefaultAsync(x => x.Task.Id == taskId &&
                                          x.Sender != null && x.Sender.Id == userId);
        }

        public async Task Confirm(string userId, TestTaskResultDto model)
        {
            var user = await _context.Users
                .Include(x => x.UserGroups)
                .ThenInclude(x => x.Group)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var task = await _context.TestTasks.FindAsync(model.TestTaskId);
            var result = new TestTaskResult()
            {
                Task = task,
                Group = user.UserGroups != null && user.UserGroups.Count > 0 ? user.UserGroups[0].Group : null,
                Sender = user,
                Points = model.Questions
                    .Select(x => x.Points)
                    .Aggregate((x, y) => x + y)
            };
            await _context.TestTaskResults.AddAsync(result);
            await _context.SaveChangesAsync();
        }
    }
}