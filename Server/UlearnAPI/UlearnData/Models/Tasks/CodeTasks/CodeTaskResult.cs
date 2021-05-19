using System.Text.Json.Serialization;

namespace UlearnData.Models.Tasks.CodeTasks
{
    public class CodeTaskResult
    {
        public int Id { get; set; }
        
        public string Code { get; set; }
        
        public CodeTask CodeTask { get; set; }
        [JsonIgnore] public User Sender { get; set; }
        public Group Group { get; set; }
        
        public CodeTaskReview Review { get; set; }
    }
}