using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
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

        public async Task Update(string userId, UserInfoDto model)
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
    }
}