using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UlearnAPI.AOP;
using UlearnData.Models;
using UlearnServices.Models.Module;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        private readonly ModulesService _modulesService;

        public ModuleController(ModulesService modulesService)
        {
            _modulesService = modulesService;
        }

        // GET: api/Module
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Module>>> GetModules()
        {
            return await _modulesService.GetAsync();
        }

        // GET: api/Module/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Module>> GetModule(int id)
        {
            var module = await _modulesService.FindAsync(id);

            if (module == null)
            {
                return NotFound();
            }

            return module;
        }

        // PUT: api/Module/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<IActionResult> PutModule(int id, ModuleDto module)
        {
            try
            {
                await _modulesService.PutAsync(id, module);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_modulesService.ModuleExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/Module
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<Module>> PostModule(ModuleDto module)
        {
            var newModule = await _modulesService.CreateAsync(module);
            return CreatedAtAction("GetModule", new {id = newModule.Id}, newModule);
        }

        // DELETE: api/Module/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [LogAuthorizeRoles("Admin")]
        public async Task<ActionResult<Module>> DeleteModule(int id)
        {
            var module = await _modulesService.FindAsync(id);
            if (module == null)
            {
                return NotFound();
            }

            await _modulesService.Remove(module);

            return module;
        }
    }
}