using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;
using UlearnServices.Models.Account;
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

        public async Task<List<FullGroupDto>> GetAsync()
        {
            var a = (await _context.Groups
                .Include(x => x.Course)
                .Include(x => x.UserGroups)
                .ThenInclude(x => x.User)
                .ToListAsync());
            return (await _context.Groups
                    .Include(x => x.Course)
                    .Include(x => x.UserGroups)
                    .ThenInclude(x => x.User)
                    .ToListAsync())
                .Select(x => new FullGroupDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    CourseId = x.Course.Id,
                    Emails = x.UserGroups
                        .Select(y => y.User.Email)
                        .ToList()
                })
                .ToList();
        }

        public async Task<FullGroupDto> FindAsync(int id)
        {
            var group = await _context.Groups
                .Include(x => x.Course)
                .Include(x => x.UserGroups)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(module => module.Id == id);
            return new FullGroupDto
            {
                Id = group.Id,
                Name = group.Name,
                CourseId = group.Course.Id,
                Emails = group.UserGroups
                    .Select(x => x.User.Email)
                    .ToList()
            };
        }

        public async Task<FullGroupDto> CreateAsync(GroupDto model)
        {
            var group = new Group
            {
                Name = model.Name,
                Course = await _context.Courses.FindAsync(model.CourseId),
            };

            if (group.Course == null)
            {
                throw new ArgumentException();
            }

            group.UserGroups = (await Task.WhenAll(model.Emails
                    .Select(x => _userManager.FindByEmailAsync(x))))
                    .Where(x => x != null)
                .Select(x => new UserGroup
                {
                    Group = group,
                    User = x
                })
                .ToList();

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return new FullGroupDto
            {
                Id = group.Id,
                Name = group.Name,
                CourseId = group.Course.Id,
                Emails = group.UserGroups
                    .Select(x => x.User.Email)
                    .ToList()
            };
        }

        public async Task PutAsync(int id, GroupDto model)
        {
            var group = await _context.Groups.FindAsync(id);

            group.Course = await _context.Courses.FindAsync(model.CourseId);
            if (group.Course == null)
            {
                throw new ArgumentException();
            }
            
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

        public async Task<FullGroupDto> Remove(int id)
        {
            var group = _context.Groups
                .Include(x => x.Course)
                .Include(x => x.UserGroups)
                .ThenInclude(x => x.User)
                .First(x => x.Id == id);

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
            return new FullGroupDto
            {
                Id = group.Id,
                Name = group.Name,
                CourseId = group.Course.Id,
                Emails = group.UserGroups
                    .Select(x => x.User.Email)
                    .ToList()
            };
        }
        
        public async Task<bool> HasUser(User user, int groupId)
        {
            var group = await _context.Groups
                .Include(g => g.UserGroups)
                .ThenInclude(userGroup => userGroup.User)
                .FirstOrDefaultAsync(g => g.Id == groupId);

            return group.UserGroups
                .FirstOrDefault(userGroup => userGroup.User.Id == user.Id) != default;
        }
    }
}