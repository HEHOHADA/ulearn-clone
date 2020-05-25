using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace UlearnAPI.AOP
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class LogAuthorizeRolesAttribute : ActionFilterAttribute
    {
        private readonly string[] _roles;

        public LogAuthorizeRolesAttribute(string roles)
        {
            _roles = roles.Split(',');
        }

        public override void OnActionExecuting(ActionExecutingContext  context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                return;
            }

            List<string> roles = _roles.Where(role => user.IsInRole(role)).ToList();
            if (roles.Count > 0)
            {
                var logger = context.HttpContext.RequestServices.GetService<ILogger<LogAuthorizeRolesAttribute>>();
                logger.LogInformation($"User {user.FindFirstValue("sub")} " +
                                      $"in roles {roles.Aggregate((x, y) => $"{x}, {y}")} " +
                                      $"is trying to access {context.HttpContext.Request.Path} " +
                                      $"{context.HttpContext.Request.Method} " +
                                      $"at {DateTime.Now}");
            }
        }
    }
}