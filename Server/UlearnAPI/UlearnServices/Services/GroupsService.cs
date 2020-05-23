using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;

namespace UlearnServices.Services
{
    public class GroupsService
    {
        private readonly ApplicationDbContext _context;

        public GroupsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool GroupExists(int id)
        {
            return _context.Modules.Any(e => e.Id == id);
        }

        public async Task<List<Group>> GetAsync()
        {
            return await _context.Groups
                .Include(group => group.UserGroups)
                    .ThenInclude(userGroup => userGroup.User)
                .ToListAsync();
        }

        public async Task<Group> FindAsync(int id)
        {
            return await _context.Groups
                .Include(group => group.UserGroups)
                    .ThenInclude(userGroup => userGroup.User)
                .FirstOrDefaultAsync(module => module.Id == id);
        }

        public async Task<Group> CreateAsync(Group group)
        {
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();
            return group;
        }

        public async Task PutAsync(Group group)
        {
            _context.Entry(group).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Remove(Group group)
        {
            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
        }
    }
}