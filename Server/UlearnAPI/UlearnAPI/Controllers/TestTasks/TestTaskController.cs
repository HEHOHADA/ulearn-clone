using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UlearnAPI.AOP;
using UlearnData.Models;
using UlearnData.Models.Tasks.TestTasks;
using UlearnServices.Models.Tasks.TestTasks;
using UlearnServices.Services.TestTasks;

namespace UlearnAPI.Controllers.TestTasks
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestTaskController : ControllerBase
    {
        private readonly TestTasksService _testTasksService;
        private readonly UserManager<User> _userManager;

        public TestTaskController(TestTasksService testTasksService, UserManager<User> userManager)
        {
            _testTasksService = testTasksService;
            _userManager = userManager;
        }

        // GET: api/TestTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UlearnData.Models.Tasks.TestTasks.TestTask>>> GetTestTasks()
        {
            return await _testTasksService.GetAsync();
        }

        // GET: api/TestTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UlearnData.Models.Tasks.TestTasks.TestTask>> GetTestTask(int id)
        {
            var testTask = await _testTasksService.FindAsync(id);

            if (testTask == null)
            {
                return NotFound();
            }

            return testTask;
        }

        // PUT: api/TestTask/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<IActionResult> PutTestTask(int id, TestTaskDto testTask)
        {
            try
            {
                await _testTasksService.PutAsync(id, testTask);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_testTasksService.TestTaskExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // POST: api/TestTask
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<UlearnData.Models.Tasks.TestTasks.TestTask>> PostTestTask(TestTaskDto testTask)
        {
            var newTestTask = await _testTasksService.CreateAsync(testTask);
            return CreatedAtAction("GetTestTask", new { id = newTestTask.Id }, newTestTask);
        }

        // DELETE: api/TestTask/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<UlearnData.Models.Tasks.TestTasks.TestTask>> DeleteTestTask(int id)
        {
            var testTask = await _testTasksService.FindAsync(id);
            if (testTask == null)
            {
                return NotFound();
            }
            
            await _testTasksService.Remove(testTask);
            
            return testTask;
        }

        [HttpGet("results")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TestQuestionAnswerResult>>> GetResults(int id, [FromQuery] int groupId)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _testTasksService.GetResults(id, groupId, user.Id);
        }
    }
}
