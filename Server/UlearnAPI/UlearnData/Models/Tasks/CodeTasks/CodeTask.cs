using System.Text.Json.Serialization;

namespace UlearnData.Models.Tasks.CodeTasks
{
    public class CodeTask
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string InitialCode { get; set; }
        public int Points { get; set; }

        [JsonIgnore] public Module Module { get; set; }
    }
}