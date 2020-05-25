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
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UlearnAPI.AOP;
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

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue("sub");
            return Ok(await _accountService.Get(userId));
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
        [SensitiveAuthorize]
        public async Task<IActionResult> UpdateData([FromBody] FullUserInfoDto model)
        {
            var userId = User.FindFirstValue("sub");
            await _accountService.Update(userId, model);
            return Ok(new { });
        }

        [HttpPost("changePassword")]
        [SensitiveAuthorize]
        public async Task<IActionResult> ChangePassword(PasswordDto model)
        {
            var userId = User.FindFirstValue("sub");
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.ChangePasswordAsync(user, model.Current, model.Password);
            if (result.Succeeded)
            {
                return Ok(new { });
            }

            return BadRequest();
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
            return Ok(new { });
        }

        [HttpPost("confirmTeacher")]
        [SensitiveAuthorize]
        public async Task<IActionResult> ConfirmTeacher()
        {
            var userId = User.FindFirstValue("sub");
            await _accountService.ConfirmTeacher(userId);
            return Ok(new { });
        }

        [HttpPost("auth/google")]
        public async Task<IActionResult> GoogleLogin(GoogleLogin request)
        {
            try
            {
                var user = await GetOrCreateExternalLoginUser("google", request.Subject, request.Email,
                    request.GivenName, request.FamilyName);

                return Ok(new {Token = await GenerateJwtToken(user)});
            }
            catch
            {
                return BadRequest();
            }
        }

        /*[HttpPost("auth/google")]
        public async Task<IActionResult> GoogleLogin(GoogleLogin request)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.IdToken,
                    new GoogleJsonWebSignature.ValidationSettings
                    {
                        Audience = new[] {_configuration["Authentication:Google:ClientId"]}
                    });
                var user = await GetOrCreateExternalLoginUser("google", payload.Subject, payload.Email,
                    payload.GivenName, payload.FamilyName);

                return Ok(new {Token = await GenerateJwtToken(user)});
            }
            catch
            {
                return BadRequest();
            }
        }*/

        private async Task<User> GetOrCreateExternalLoginUser(string provider, string key, string email,
            string firstName, string lastName)
        {
            // Login already linked to a user
            var user = await _userManager.FindByLoginAsync(provider, key);
            if (user != null)
                return user;

            user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // No user exists with this email address, we create a new one
                user = new User
                {
                    Email = email,
                    UserName = email,
                    Firstname = firstName,
                    Lastname = lastName
                };

                await _userManager.CreateAsync(user);
            }

            // Link the user to this login
            var info = new UserLoginInfo(provider, key, provider.ToUpperInvariant());
            var result = await _userManager.AddLoginAsync(user, info);
            if (result.Succeeded)
                return user;
            return null;
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

        [HttpGet("checkSubscription/{courseId}")]
        [Authorize]
        public async Task<ActionResult<bool>> CheckSubscription(int courseId)
        {
            var user = await _userManager.GetUserAsync(User);
            var result = await _accountService.IsCourseAvailable(user, courseId);
            if (result.HasValue)
                return Ok(new {HasAccess = result.Value});
            return NotFound();
        }
    }

    public class GoogleLogin
    {
        public string Email { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        public string Subject { get; set; }
    }

    /*public class GoogleLogin
    {
        public string IdToken { get; set; }
    }*/

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

    public class PasswordDto
    {
        public string Current { get; set; }
        public string Password { get; set; }
    }
}