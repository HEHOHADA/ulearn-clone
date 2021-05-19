using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UlearnData.Models.MongoModels
{
    public class Log
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public string Path { get; set; }
        
        public long Elapsed { get; set; }
    }
}