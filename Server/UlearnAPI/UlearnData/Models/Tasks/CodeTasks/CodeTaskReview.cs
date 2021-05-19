using System.Text.Json.Serialization;

namespace UlearnData.Models.Tasks.CodeTasks
{
    public class CodeTaskReview
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int CodeTaskResultId { get; set; }
        [JsonIgnore] public CodeTaskResult Result { get; set; }
        public User Teacher { get; set; }
    }
}