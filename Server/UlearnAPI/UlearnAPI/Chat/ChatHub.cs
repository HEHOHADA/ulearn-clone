using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;

namespace UlearnAPI.Chat
{
    public class ChatHub : Hub
    {
        private static readonly List<(string username, string message)>
            Messages = new List<(string username, string message)>();

        private const int MessagesListSize = 10;

        public static void AddMessage(string username, string message)
        {
            Messages.Add((username, message));
            if (Messages.Count > MessagesListSize)
            {
                Messages.RemoveAt(0);
            }
        }


        public async Task GetAll()
        {
            Console.WriteLine("GetAll was called in ChatHub");
            List<Task> tasks = new List<Task>();
            foreach (var message in Messages)
            {
                tasks.Add(Clients.Caller.SendAsync(
                    "messageReceived", message.username, message.message));
            }

            await Task.WhenAll(tasks);
        }

        public async Task NewMessage(string username, string message)
        {
            Console.WriteLine($"Message {message} from user with name {username} received in ChatHub");
            AddMessage(username, message);
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}