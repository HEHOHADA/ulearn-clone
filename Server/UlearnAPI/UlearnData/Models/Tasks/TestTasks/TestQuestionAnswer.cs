using System.Text.Json.Serialization;

namespace UlearnData.Models.Tasks.TestTasks
{
    public class TestQuestionAnswer
    {
        public int Id { get; set; }
        
        public string Text { get; set; }
        public bool IsRight { get; set; }
        
        [JsonIgnore] public TestQuestion Question { get; set; }
    }
}