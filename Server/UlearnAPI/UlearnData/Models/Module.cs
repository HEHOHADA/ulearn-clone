using System.Collections.Generic;
using System.Text.Json.Serialization;
using UlearnData.Models.Tasks.CodeTask;
using UlearnData.Models.Tasks.TestTask;
using UlearnData.Models.Tasks.VideoTask;

namespace UlearnData.Models
{
    public class Module
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore] public Course Course { get; set; }

        public List<TestTask> TestTasks { get; set; }
        public List<VideoTask> VideoTasks { get; set; }
        public List<CodeTask> CodeTasks { get; set; }
    }
}