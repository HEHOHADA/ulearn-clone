using Microsoft.AspNetCore.Identity;

namespace UlearnData.Models.Tasks.VideoTask
{
    public class VideoTaskResult
    {
        public int Id { get; set; }
        
        public VideoTask VideoTask { get; set; }
        public User Sender { get; set; }
        public Group Group { get; set; }
    }
}