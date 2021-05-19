namespace UlearnData.Models.Tasks.VideoTasks
{
    public class VideoTaskResult
    {
        public int Id { get; set; }
        
        public VideoTask VideoTask { get; set; }
        public User Sender { get; set; }
        public Group Group { get; set; }
    }
}