using Microsoft.AspNetCore.Identity;

namespace UlearnData.Models.Tasks.TestTask
{
    public class TestQuestionAnswerResult
    {
        public int Id { get; set; }

        public TestQuestionAnswer Answer { get; set; }
        public User Sender { get; set; }
        public Group Group { get; set; }
    }
}