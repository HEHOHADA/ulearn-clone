using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
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
                context.Result = new StatusCodeResult((int) System.Net.HttpStatusCode.Forbidden);
            }
        }
    }
}