using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UlearnAPI.AOP;
using UlearnData.Models;
using UlearnServices.Models.Group;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly GroupsService _groupsService;
        private readonly UserManager<User> _userManager;

        public GroupController(GroupsService groupsService, UserManager<User> userManager)
        {
            _groupsService = groupsService;
            _userManager = userManager;
        }

        // GET: api/Group
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FullGroupDto>>> GetGroups()
        {
            return await _groupsService.GetAsync();
        }

        // GET: api/Group/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FullGroupDto>> GetGroup(int id)
        {
            var group = await _groupsService.FindAsync(id);

            if (group == null)
            {
                return NotFound();
            }

            return group;
        }

        // PUT: api/Group/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin, Teacher")]
        [LogAuthorizeRoles("Admin,Teacher")]
        public async Task<IActionResult> PutGroup(int id, GroupDto group)
        {
            var user = await _userManager.GetUserAsync(User);
            if (!await _userManager.IsInRoleAsync(user, "Admin") && !await _groupsService.HasUser(user, id))
            {
                return Unauthorized();
            }

            try
            {
                await _groupsService.PutAsync(id, group);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_groupsService.GroupExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/Group
        [HttpPost]
        [Authorize(Roles = "Admin, Teacher")]
        [LogAuthorizeRoles("Admin,Teacher")]
        public async Task<ActionResult<FullGroupDto>> PostGroup(GroupDto group)
        {
            var userId = User.FindFirstValue("sub");
            var newGroup = await _groupsService.CreateAsync(userId, group);
            return CreatedAtAction("GetGroup", new {id = newGroup.Id}, newGroup);
        }

        // DELETE: api/Group/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Teacher")]
        [LogAuthorizeRoles("Admin,Teacher")]
        public async Task<ActionResult<FullGroupDto>> DeleteGroup(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (!await _userManager.IsInRoleAsync(user, "Admin") && !await _groupsService.HasUser(user, id))
            {
                return Unauthorized();
            }
            
            if (!_groupsService.GroupExists(id))
            {
                return NotFound();
            }

            return await _groupsService.Remove(id);
        }

        [HttpGet("ByUser")]
        [Authorize]
        public async Task<List<FullGroupDto>> GetByUser()
        {
            var userId = User.FindFirstValue("sub");
            return await _groupsService.GetByUser(userId);
        }
    }
}