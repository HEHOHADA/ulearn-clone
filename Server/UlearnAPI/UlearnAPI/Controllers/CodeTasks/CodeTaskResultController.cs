using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UlearnAPI.AOP;
using UlearnData.Models.Tasks.CodeTasks;
using UlearnServices.Models.Tasks.CodeTasks;
using UlearnServices.Services.CodeTasks;

namespace UlearnAPI.Controllers.CodeTasks
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodeTaskResultController : ControllerBase
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

        [HttpGet("forreview/{codeTaskResultId}")]
        [Authorize(Roles = "Admin, Teacher")]
        [LogAuthorizeRoles("Admin,Teacher")]
        public async Task<CodeTaskResultViewDto> GetForReview(int codeTaskResultId)
        {
            return await _codeTaskResultService.GetForReview(codeTaskResultId);
        }

        [HttpPost("Review/{codeTaskResultId}")]
        [Authorize(Roles = "Admin, Teacher")]
        [LogAuthorizeRoles("Admin,Teacher")]
        public async Task<IActionResult> DoReview(int codeTaskResultId, CodeTaskForReviewDto model)
        {
            var userId = User.FindFirstValue("sub"); 
            await _codeTaskResultService.DoReview(codeTaskResultId, userId, model);
            return Ok(new { });
        }

        [HttpGet("groupResults/{groupId}")]
        [Authorize(Roles = "Admin, Teacher")]
        [LogAuthorizeRoles("Admin,Teacher")]
        public async Task<List<CodeTaskResultPartialDto>> GetGroupResults(int groupId)
        {
            return await _codeTaskResultService.GetGroupResults(groupId);
        }
    }
}