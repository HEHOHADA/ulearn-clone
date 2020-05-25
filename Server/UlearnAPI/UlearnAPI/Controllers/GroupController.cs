using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

        public GroupController(GroupsService groupsService)
        {
            _groupsService = groupsService;
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
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<IActionResult> PutGroup(int id, GroupDto group)
        {
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
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<FullGroupDto>> PostGroup(GroupDto group)
        {
            var newGroup = await _groupsService.CreateAsync(group);
            return CreatedAtAction("GetGroup", new { id = newGroup.Id }, newGroup);
        }

        // DELETE: api/Group/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<FullGroupDto>> DeleteGroup(int id)
        {
            if (!_groupsService.GroupExists(id))
            {
                return NotFound();
            }

            return await _groupsService.Remove(id);
        }
    }
}
