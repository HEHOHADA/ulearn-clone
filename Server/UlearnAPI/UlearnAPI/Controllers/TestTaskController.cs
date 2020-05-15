using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UlearnData.Models.Tasks.TestTask;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestTaskController : ControllerBase
    {
        private readonly TestTasksService _testTasksService;

        public TestTaskController(TestTasksService testTasksService)
        {
            _testTasksService = testTasksService;
        }

        // GET: api/TestTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestTask>>> GetTestTasks()
        {
            return await _testTasksService.GetAsync();
        }

        // GET: api/TestTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TestTask>> GetTestTask(int id)
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
        public async Task<IActionResult> PutTestTask(int id, TestTask testTask)
        {
            if (id != testTask.Id)
            {
                return BadRequest();
            }

            try
            {
                await _testTasksService.PutAsync(testTask);
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
        public async Task<ActionResult<TestTask>> PostTestTask(TestTask testTask)
        {
            return CreatedAtAction("GetTestTask", new { id = testTask.Id },
                await _testTasksService.CreateAsync(testTask));
        }

        // DELETE: api/TestTask/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<TestTask>> DeleteTestTask(int id)
        {
            var testTask = await _testTasksService.FindAsync(id);
            if (testTask == null)
            {
                return NotFound();
            }
            
            await _testTasksService.Remove(testTask);
            
            return testTask;
        }
    }
}
