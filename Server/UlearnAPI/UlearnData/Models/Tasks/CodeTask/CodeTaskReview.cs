using Microsoft.AspNetCore.Identity;

namespace UlearnData.Models.Tasks.CodeTask
{
    public class CodeTaskReview
    {
        public int Id { get; set; }
        
        public string Text { get; set; }
        
        public CodeTaskResult Result { get; set; }
        public User Teacher { get; set; }
    }
}