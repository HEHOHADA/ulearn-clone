using System.Collections.Generic;
using UlearnServices.Models.Tasks.TestTasks.TestQuestionAnswer;

namespace UlearnServices.Models.Tasks.TestTasks.TestQuestion
{
    public class TestQuestionDto
    {
        public string Text { get; set; }
        public int Points { get; set; }
        
        public List<TestQuestionAnswerDto> Answers { get; set; }
    }
}