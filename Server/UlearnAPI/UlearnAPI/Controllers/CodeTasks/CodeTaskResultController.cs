using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UlearnData.Models.Tasks.CodeTasks;
using UlearnServices.Models.Tasks.CodeTasks;
using UlearnServices.Services.CodeTasks;

namespace UlearnAPI.Controllers.CodeTasks
{
    [Route("api/{controller}")]
    [ApiController]
    public class CodeTaskResultController : Controller
    {
        private readonly CodeTaskResultService _codeTaskResultService;

        public CodeTaskResultController(CodeTaskResultService codeTaskResultService)
        {
            _codeTaskResultService = codeTaskResultService;
        }


        [HttpPost("confirm")]
        [Authorize]
        public async Task<IActionResult> Confirm(CodeTaskResultDto model)
        {
            var userId = User.FindFirstValue("sub");
            await _codeTaskResultService.Confirm(userId, model);
            return Ok(new { });
        }

        [HttpGet("{taskId}")]
        [Authorize]
        public async Task<CodeTaskResult> GetByTaskId(int taskId)
        {
            var userId = User.FindFirstValue("sub");
            return await _codeTaskResultService.GetByTaskId(userId, taskId);
        }
    }
}