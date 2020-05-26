using System.Text.Json.Serialization;

namespace UlearnData.Models.Tasks.VideoTasks
{
    public class VideoTask
    {
        public int Id { get; set; }
        public string VideoHref { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        
        [JsonIgnore] public Module Module { get; set; }
    }
}