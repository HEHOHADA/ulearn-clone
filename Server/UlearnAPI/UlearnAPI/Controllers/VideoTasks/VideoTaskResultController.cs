using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UlearnData.Models.Tasks.VideoTasks;
using UlearnServices.Models.Tasks.VideoTasks;
using UlearnServices.Services.VideoTasks;

namespace UlearnAPI.Controllers.VideoTasks
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoTaskResultController : ControllerBase
    {
        private readonly VideoTaskResultService _videoTaskResultService;

        public VideoTaskResultController(VideoTaskResultService videoTaskResultService)
        {
            _videoTaskResultService = videoTaskResultService;
        }

        [HttpPost("submit")]
        [Authorize]
        public async Task<IActionResult> Submit(VideoTaskResultDto model)
        {
            var userId = User.FindFirstValue("sub");
            await _videoTaskResultService.Confirm(userId, model);
            return Ok(new { });
        }

        
        [HttpGet("{taskId}")]
        [Authorize]
        public async Task<VideoTaskResult> GetByTaskId(int taskId)
        {
            var userId = User.FindFirstValue("sub");
            return await _videoTaskResultService.GetByTaskId(userId, taskId);
        }
    }
}