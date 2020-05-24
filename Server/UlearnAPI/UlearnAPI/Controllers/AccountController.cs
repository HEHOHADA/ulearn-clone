using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UlearnData.Models;
using UlearnServices.Models.Account;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly AccountService _accountService;
        private readonly IWebHostEnvironment _appEnvironment;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager,
            IConfiguration configuration, AccountService accountService, IWebHostEnvironment appEnvironment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _accountService = accountService;
            _appEnvironment = appEnvironment;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (model.Login.IndexOf('@') > -1)
            {
                if (!new Regex(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                               @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                               @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")
                    .IsMatch(model.Login))
                {
                    return BadRequest(new {Message = new[] {"Email is not valid"}});
                }

                var user = await _userManager.FindByEmailAsync(model.Login);
                if (user == null)
                {
                    return BadRequest(new {Message = new[] {"Invalid UserName or password"}});
                }

                model.Login = user.UserName;
            }
            else
            {
                if (!new Regex(@"^[a-zA-Z0-9]*$").IsMatch(model.Login))
                {
                    return BadRequest(new {Message = new[] {"Username is not valid"}});
                }
            }

            var result = await _signInManager.PasswordSignInAsync(model.Login, model.Password, false, false);

            if (result.Succeeded)
            {
                var user = _userManager.Users.SingleOrDefault(r => r.UserName == model.Login);
                return Ok(new {Token = await GenerateJwtToken(user)});
            }

            return BadRequest(new {Message = new[] {"Invalid UserName or password"}});
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return Ok(new {Token = await GenerateJwtToken(user)});
            }

            return BadRequest(new
            {
                Message = result.Errors
                    .Select(x => x.Description)
                    .ToList()
            });
        }

        [HttpPut("updateData")]
        [Authorize]
        public async Task<IActionResult> UpdateData([FromBody] UserInfoDto model)
        {
            var userId = User.FindFirstValue("sub");
            var user = await _userManager.FindByIdAsync(userId);
            await _userManager.SetUserNameAsync(user, model.Username);
            await _userManager.SetEmailAsync(user, model.Email);
            await _accountService.Update(userId, new UserInfo
            {
                Firstname = model.Firstname, Lastname = model.Lastname
            });
            return Ok();
        }

        [HttpPost("changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(PasswordDto model)
        {
            var userId = User.FindFirstValue("sub");
            var user = await _userManager.FindByIdAsync(userId);
            await _userManager.ChangePasswordAsync(user, model.Current, model.Password);
            return Ok();
        }

        [HttpPost("setImage")]
        [Authorize]
        public async Task<IActionResult> SetImage(IFormFile file)
        {
            string fileName = new Guid() + new FileInfo(file.FileName).Extension;
            using (var fileStream = new FileStream(_appEnvironment.WebRootPath + "/Files/" + fileName, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            
            var userId = User.FindFirstValue("sub");
            await _accountService.SetImage(userId, fileName);
            return Ok();
        }

        [HttpPost("confirmTeacher")]
        [Authorize]
        public async Task<IActionResult> ConfirmTeacher()
        {
            var userId = User.FindFirstValue("sub");
            await _accountService.ConfirmTeacher(userId);
            return Ok();
        }
        

        private async Task<string> GenerateJwtToken(User user)
        {
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(
                new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim("name", user.UserName),
                },
                "Token");

            claimsIdentity.AddClaims((await _userManager.GetRolesAsync(user))
                .Select(role => new Claim("role", role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:ExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claimsIdentity.Claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginDto
    {
        [Required] public string Login { get; set; }

        [Required] public string Password { get; set; }
    }

    public class RegisterDto
    {
        [Required] public string UserName { get; set; }

        [Required] [EmailAddress] public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
        public string Password { get; set; }
    }

    public class UserInfoDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }

    public class PasswordDto
    {
        public string Current { get; set; }
        public string Password { get; set; }
    }
}