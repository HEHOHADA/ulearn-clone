using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UlearnAPI.AOP;
using UlearnData;
using UlearnData.Models;
using UlearnData.Models.Tasks.CodeTask;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodeTaskController : ControllerBase
    {
        private readonly CodeTasksService _codeTasksService;
        private readonly AccountService _accountService;
        private readonly UserManager<User> _userManager;

        public CodeTaskController(CodeTasksService codeTasksService, AccountService accountService, UserManager<User> userManager)
        {
            _accountService = accountService;
            _codeTasksService = codeTasksService;
            _userManager = userManager;
        }

        // GET: api/CodeTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CodeTask>>> GetCodeTasks()
        {
            return await _codeTasksService.GetAsync();
        }

        // GET: api/CodeTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CodeTask>> GetCodeTask(int id)
        {
            var codeTask = await _codeTasksService.FindAsync(id);

            if (codeTask == null)
            {
                return NotFound();
            }

            return codeTask;
        }

        // PUT: api/CodeTask/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<IActionResult> PutCodeTask(int id, CodeTask codeTask)
        {
            if (id != codeTask.Id)
            {
                return BadRequest();
            }

            try
            {
                await _codeTasksService.PutAsync(codeTask);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_codeTasksService.CodeTaskExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/CodeTask
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<CodeTask>> PostCodeTask(int moduleId, CodeTask codeTask)
        {
            var newCodeTask = await _codeTasksService.CreateAsync(moduleId, codeTask);
            return CreatedAtAction("GetCodeTask", new {id = newCodeTask.Id}, newCodeTask);
        }

        // DELETE: api/CodeTask/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<CodeTask>> DeleteCodeTask(int id)
        {
            var codeTask = await _codeTasksService.FindAsync(id);
            if (codeTask == null)
            {
                return NotFound();
            }

            await _codeTasksService.Remove(codeTask);

            return codeTask;
        }

        [HttpGet("results")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CodeTaskResult>>> GetResults(int id,[FromQuery] int groupId)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _codeTasksService.GetResults(id, groupId, user.Id);
        }

        [HttpGet("groupResults")]
        [Authorize(Roles = "Teacher, Admin")]
        [LogAuthorizeRoles("Teacher,Admin")]
        public async Task<ActionResult<IEnumerable<CodeTaskResult>>> GetGroupResults([FromQuery] int groupId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (!await _userManager.IsInRoleAsync(user, "Admin") && !await _accountService.IsInGroup(user, groupId))
            {
                return Unauthorized();
            }
            return await _codeTasksService.GetGroupResults(groupId);
        }
    }
}