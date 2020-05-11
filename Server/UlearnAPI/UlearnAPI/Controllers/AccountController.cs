using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UlearnData.Models;

namespace UlearnAPI.Controllers
{
    public class AccountController : Controller
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<object> Login([FromBody] LoginDto model)
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
                return Json(new {Token = await GenerateJwtToken(user)});
            }

            return BadRequest(new {Message = new[] {"Invalid UserName or password"}});
        }

        [HttpPost]
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
                return Json(new {Token = await GenerateJwtToken(user)});
            }

            return BadRequest(new
            {
                Message = result.Errors
                    .Select(x => x.Description)
                    .ToList()
            });
        }

        private async Task<object> GenerateJwtToken(User user)
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
    }
}