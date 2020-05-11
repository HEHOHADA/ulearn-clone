using System.Collections.Generic;

namespace UlearnData.Models.Tasks.VideoTask
{
    public class VideoTask
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        
        public Module Module { get; set; }
    }
}