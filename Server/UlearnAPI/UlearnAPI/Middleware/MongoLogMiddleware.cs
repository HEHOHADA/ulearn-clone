using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using UlearnData.Models.MongoModels;
using UlearnServices.Services;

namespace UlearnAPI.Middleware
{
    public class MongoLogMiddleware
    {
        private readonly RequestDelegate _next;

        public MongoLogMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, LoggingService loggingService)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();

            await _next(context);

            try
            {
                loggingService.Create(new Log
                {
                    Elapsed = stopwatch.ElapsedMilliseconds,
                    Path = context.Request.Path
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}