namespace UlearnData.Models.Tasks.TestTask
{
    public class TestQuestionAnswer
    {
        public int Id { get; set; }
        
        public string Text { get; set; }
        public bool IsRight { get; set; }
        
        public TestQuestion Question { get; set; }
    }
}