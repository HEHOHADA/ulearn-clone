using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using UlearnData.Models.MongoModels;
using UlearnServices.Services;

namespace UlearnAPI.Chat
{
    public class ChatHub : Hub
    {
        private readonly ChatService _chatService;

        private const int MessagesListSize = 10;

        public ChatHub(ChatService chatService)
        {
            _chatService = chatService;
        }

        private void AddMessage(string username, string message)
        {
            _chatService.Create(new ChatMessage()
            {
                Sender = username,
                Message = message
            });
        }
        
        public async Task GetAll()
        {
            foreach (var message in _chatService.GetAmount(MessagesListSize))
            {
                await Clients.Caller.SendAsync(
                    "messageReceived", message.Sender, message.Message);
            }
        }

        public async Task NewMessage(string username, string message)
        {
            AddMessage(username, message);
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}