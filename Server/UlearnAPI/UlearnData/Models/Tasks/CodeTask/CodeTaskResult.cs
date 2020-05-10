using Microsoft.AspNetCore.Identity;

namespace UlearnData.Models.Tasks.CodeTask
{
    public class CodeTaskResult
    {
        public int Id { get; set; }
        
        public CodeTask CodeTask { get; set; }
        public User Sender { get; set; }
        public Group Group { get; set; }
        
        public CodeTaskReview Review { get; set; }
    }
}