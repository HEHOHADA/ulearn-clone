using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using UlearnData.Models;

namespace UlearnAPI.AOP
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class SensitiveAuthorizeAttribute : AuthorizeAttribute, IAsyncAuthorizationFilter 
    {
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.User.Identity.IsAuthenticated)
            {
                return;
            }

            var userManager = context.HttpContext.RequestServices.GetService<UserManager<User>>();
            var user = await userManager.FindByIdAsync(context.HttpContext.User.FindFirstValue("sub"));
            if (await userManager.IsLockedOutAsync(user))
            {
                var logger = context.HttpContext.RequestServices.GetService<ILogger<LogAuthorizeRolesAttribute>>();
                logger.LogInformation($"User {user.Id} " +
                                      $"is forbidden to access {context.HttpContext.Request.Path} " +
                                      $"{context.HttpContext.Request.Method} " +
                                      $"at {DateTime.Now} due to lockout");
                context.Result = new StatusCodeResult((int) System.Net.HttpStatusCode.Forbidden);
            }
        }
    }
}