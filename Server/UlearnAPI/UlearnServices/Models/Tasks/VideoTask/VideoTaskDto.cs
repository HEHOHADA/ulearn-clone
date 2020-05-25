namespace UlearnServices.Models.Tasks.VideoTask
{
    public class VideoTaskDto
    {
        public int ModuleId { get; set; }
        
        public string Name { get; set; }
        public string VideoHref { get; set; }
        public string Description { get; set; }
    }
}