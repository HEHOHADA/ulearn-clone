using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;
using UlearnServices.Models.Group;

namespace UlearnServices.Services
{
    public class GroupsService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public GroupsService(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
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

        public async Task<Group> CreateAsync(GroupDto model)
        {
            var group = new Group
            {
                Name = model.Name,
                Course = await _context.Courses.FindAsync(model.CourseId),
            };

            group.UserGroups = (await Task.WhenAll(model.Emails
                    .Select(x => _userManager.FindByEmailAsync(x))))
                .Select(x => new UserGroup
                {
                    Group = group,
                    User = x
                })
                .ToList();

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();
            return group;
        }

        public async Task PutAsync(int id, GroupDto model)
        {
            var group = await _context.Groups.FindAsync(id);

            group.Course = await _context.Courses.FindAsync(model.CourseId);
            group.UserGroups = (await Task.WhenAll(model.Emails
                    .Select(x => _userManager.FindByEmailAsync(x))))
                .Select(x => new UserGroup
                {
                    Group = group,
                    User = x
                })
                .ToList();

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