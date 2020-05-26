using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UlearnData.Models.Tasks.TestTasks
{
    public class TestTask
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        public int Points { get; set; }
        
        public List<TestQuestion> Questions { get; set; }
        
        [JsonIgnore] public Module Module { get; set; }
    }
}