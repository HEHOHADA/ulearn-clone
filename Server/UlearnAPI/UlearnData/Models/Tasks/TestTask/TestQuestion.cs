using System.Collections.Generic;

namespace UlearnData.Models.Tasks.TestTask
{
    public class TestQuestion
    {
        public int Id { get; set; }
        
        public string Text { get; set; }
        
        public TestTask Task { get; set; }
        
        public List<TestQuestionAnswer> Answers { get; set; }
        
    }
}