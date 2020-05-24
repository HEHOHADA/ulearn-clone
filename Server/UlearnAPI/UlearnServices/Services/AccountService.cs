using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UlearnData;
using UlearnData.Models;
using UlearnServices.Models.Account;

namespace UlearnServices.Services
{
    public class AccountService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public AccountService(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task Update(string userId, UserInfo model)
        {
            var user = await _context.Users.FindAsync(userId);
            user.Firstname = model.Firstname;
            user.Lastname = model.Lastname;
            await _context.SaveChangesAsync();
        }

        public async Task SetImage(string userId, string fileName)
        {
            var user = await _context.Users.FindAsync(userId);
            user.ImageSrc = fileName;
            await _context.SaveChangesAsync();
        }

        public async Task ConfirmTeacher(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            await _userManager.AddToRoleAsync(user, "Teacher");
        }

        public async Task<bool?> IsCourseAvailable(User user, int courseId)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == courseId);
            if (course == default)
                return null;
            return user.Subscription.Level >= course.Subscription.Level;
        }

        public async Task<bool> IsInGroup(User user, int groupId)
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