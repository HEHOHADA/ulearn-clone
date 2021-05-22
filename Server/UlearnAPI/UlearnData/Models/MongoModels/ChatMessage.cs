using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UlearnData.Models.MongoModels
{
    public class ChatMessage
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public string Sender { get; set; }
        
        public string Message { get; set; }
    }
}