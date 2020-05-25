using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using UlearnData.Models.MongoModels;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoggingController : ControllerBase
    {
        private readonly LoggingService _loggingService;

        public LoggingController(LoggingService loggingService)
        {
            _loggingService = loggingService;
        }

        [HttpGet]
        public ActionResult<List<Log>> Get() =>
            _loggingService.Get();

        [HttpGet("{id:length(24)}", Name = "Getlog")]
        public ActionResult<Log> Get(string id)
        {
            var log = _loggingService.Get(id);

            if (log == null)
            {
                return NotFound();
            }

            return log;
        }

        [HttpPost]
        public ActionResult<Log> Create(Log log)
        {
            _loggingService.Create(log);

            return CreatedAtRoute("Getlog", new { id = log.Id.ToString() }, log);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Log logIn)
        {
            var log = _loggingService.Get(id);

            if (log == null)
            {
                return NotFound();
            }

            _loggingService.Update(id, logIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var log = _loggingService.Get(id);

            if (log == null)
            {
                return NotFound();
            }

            _loggingService.Remove(log.Id);

            return NoContent();
        }
    }
}