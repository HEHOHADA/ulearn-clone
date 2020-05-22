using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models.Tasks.VideoTask;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
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
        public async Task<ActionResult<IEnumerable<VideoTask>>> GetVideoTasks()
        {
            return await _videoTasksService.GetAsync();
        }

        // GET: api/VideoTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VideoTask>> GetVideoTask(int id)
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
        public async Task<IActionResult> PutVideoTask(int id, VideoTask videoTask)
        {
            if (id != videoTask.Id)
            {
                return BadRequest();
            }

            try
            {
                await _videoTasksService.PutAsync(videoTask);
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
        public async Task<ActionResult<VideoTask>> PostVideoTask(VideoTask videoTask)
        {
            return CreatedAtAction("GetVideoTask", new { id = videoTask.Id },
                await _videoTasksService.CreateAsync(videoTask));
        }

        // DELETE: api/VideoTask/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VideoTask>> DeleteVideoTask(int id)
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
