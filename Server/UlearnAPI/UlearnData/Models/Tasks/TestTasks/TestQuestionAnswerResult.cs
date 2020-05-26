namespace UlearnData.Models.Tasks.TestTasks
{
    public class TestQuestionAnswerResult
    {
        public int Id { get; set; }

        public TestQuestionAnswer Answer { get; set; }
        public User Sender { get; set; }
        public Group Group { get; set; }
    }
}