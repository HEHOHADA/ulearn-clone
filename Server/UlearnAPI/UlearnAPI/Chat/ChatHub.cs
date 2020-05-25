using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace UlearnAPI.Chat
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(string username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}