using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using UlearnData.Models.MongoModels;
using UlearnServices.Services;

namespace UlearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatRestController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatRestController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet]
        public ActionResult<List<ChatMessage>> Get() =>
            _chatService.Get();

        [HttpGet("{id:length(24)}", Name = "GetMessage")]
        public ActionResult<ChatMessage> Get(string id)
        {
            var message = _chatService.Get(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        [HttpPost]
        public ActionResult<ChatMessage> Create(ChatMessage message)
        {
            _chatService.Create(message);

            return CreatedAtRoute("GetMessage", new { id = message.Id.ToString() }, message);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, ChatMessage messageIn)
        {
            var message = _chatService.Get(id);

            if (message == null)
            {
                return NotFound();
            }

            _chatService.Update(id, messageIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var message = _chatService.Get(id);

            if (message == null)
            {
                return NotFound();
            }

            _chatService.Remove(message.Id);

            return NoContent();
        }
    }
}