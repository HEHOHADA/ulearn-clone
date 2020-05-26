using System.Collections.Generic;
using UlearnServices.Models.Tasks.TestTasks.TestQuestion;

namespace UlearnServices.Models.Tasks.TestTasks
{
    public class TestTaskDto
    {
        public int moduleId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public List<TestQuestionDto> Questions { get; set; }
    }
}