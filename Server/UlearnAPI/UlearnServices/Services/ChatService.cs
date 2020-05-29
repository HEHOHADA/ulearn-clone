using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using UlearnData;
using UlearnData.Models.MongoModels;
using MongoDB.Driver.Linq;

namespace UlearnServices.Services
{
    public class ChatService
    {
        private readonly IMongoCollection<ChatMessage> _messagess;

        public ChatService(UlearnDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _messagess = database.GetCollection<ChatMessage>(settings.MessagesCollectionName);
        }

        public List<ChatMessage> Get() =>
            _messagess.Find(message => true).ToList();

        public ChatMessage Get(string id) =>
            _messagess.Find<ChatMessage>(message => message.Id == id).FirstOrDefault();

        public ChatMessage Create(ChatMessage message)
        {
            _messagess.InsertOne(message);
            return message;
        }

        public void Update(string id, ChatMessage messageIn) =>
            _messagess.ReplaceOne(message => message.Id == id, messageIn);

        public void Remove(ChatMessage messageIn) =>
            _messagess.DeleteOne(message => message.Id == messageIn.Id);

        public void Remove(string id) => 
            _messagess.DeleteOne(message => message.Id == id);

        public List<ChatMessage> GetAmount(int amount)
        {
            return _messagess
                .AsQueryable()
                .OrderByDescending(message => message.Id)
                .Take(amount)
                .ToList();
            
        }
    }
}