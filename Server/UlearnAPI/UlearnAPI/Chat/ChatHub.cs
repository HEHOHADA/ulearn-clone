using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System;

namespace UlearnAPI.Chat
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(string username, string message)
        {
            Console.WriteLine(username + message);
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}
