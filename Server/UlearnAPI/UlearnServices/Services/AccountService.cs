using System;
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

        public async Task<FullUserInfoDto> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return new FullUserInfoDto
            {
                Email = user.Email,
                Username = user.UserName,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                ImageSrc = user.ImageSrc
            };
        }

        public async Task Update(string userId, FullUserInfoDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);

            await _userManager.SetUserNameAsync(user, model.Username);
            await _userManager.SetEmailAsync(user, model.Email);
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

        public async Task<(bool HasAccess, Course course)> IsCourseAvailable(string userId, int courseId)
        {
            var user = _context.Users
                .Include(x => x.Subscription)
                .First(x => x.Id == userId);
            var course = await _context.Courses
                .Include(x => x.Subscription)
                .FirstOrDefaultAsync(c => c.Id == courseId);
            if (course == default)
                throw new ArgumentException("No courseId passed");
            return (
                (user.Subscription?.Level ?? 0) >= course.Subscription.Level &&
                (DateTime.Now - user.SubscriptionBoughtDate).TotalDays <= 30, course);
        }
    }
}