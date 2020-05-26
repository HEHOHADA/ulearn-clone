using System.Text.Json.Serialization;

namespace UlearnData.Models.Tasks.TestTasks
{
    public class TestTaskResult
    {
        public int Id { get; set; }

        public int Points { get; set; }

        public TestTask Task { get; set; }
        [JsonIgnore] public User Sender { get; set; }
        public Group Group { get; set; }
    }
}