using System.Collections.Generic;

namespace UlearnData.Models.Tasks.TestTask
{
    public class TestTask
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        public int Points { get; set; }
        
        public List<TestQuestion> Questions { get; set; }
        
        public Module Module { get; set; }
    }
}