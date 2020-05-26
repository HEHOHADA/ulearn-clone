using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UlearnAPI.AOP;
using UlearnServices.Models.Tasks.VideoTasks;
using UlearnServices.Services.VideoTasks;

namespace UlearnAPI.Controllers.VideoTasks
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoTaskController : ControllerBase
    {
        private readonly VideoTasksService _videoTasksService;

        public VideoTaskController(VideoTasksService videoTasksService)
        {
            _videoTasksService = videoTasksService;
        }

        // GET: api/VideoTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UlearnData.Models.Tasks.VideoTasks.VideoTask>>> GetVideoTasks()
        {
            return await _videoTasksService.GetAsync();
        }

        // GET: api/VideoTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UlearnData.Models.Tasks.VideoTasks.VideoTask>> GetVideoTask(int id)
        {
            var videoTask = await _videoTasksService.FindAsync(id);

            if (videoTask == null)
            {
                return NotFound();
            }

            return videoTask;
        }

        // PUT: api/VideoTask/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<IActionResult> PutVideoTask(int id, VideoTaskDto videoTask)
        {
            try
            {
                await _videoTasksService.PutAsync(id, videoTask);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_videoTasksService.VideoTaskExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/VideoTask
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<UlearnData.Models.Tasks.VideoTasks.VideoTask>> PostVideoTask(VideoTaskDto videoTask)
        {
            var newVideoTask = await _videoTasksService.CreateAsync(videoTask);
            return CreatedAtAction("GetVideoTask", new {id = newVideoTask.Id}, newVideoTask);
        }

        // DELETE: api/VideoTask/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<UlearnData.Models.Tasks.VideoTasks.VideoTask>> DeleteVideoTask(int id)
        {
            var videoTask = await _videoTasksService.FindAsync(id);
            if (videoTask == null)
            {
                return NotFound();
            }

            await _videoTasksService.Remove(videoTask);

            return videoTask;
        }
    }
}