using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UlearnData.Models.Tasks.TestTask
{
    public class TestQuestion
    {
        public int Id { get; set; }
        
        public string Text { get; set; }
        public int Points { get; set; }
        
        [JsonIgnore] public TestTask Task { get; set; }
        
        public List<TestQuestionAnswer> Answers { get; set; }
        
    }
}