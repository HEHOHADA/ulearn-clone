using System.Collections.Generic;

namespace UlearnServices.Models.Tasks.TestTasks
{
    public class TestTaskResultDto
    {
        public int TestTaskId { get; set; }
        public List<UlearnData.Models.Tasks.TestTasks.TestQuestion> Questions { get; set; }
    }
}