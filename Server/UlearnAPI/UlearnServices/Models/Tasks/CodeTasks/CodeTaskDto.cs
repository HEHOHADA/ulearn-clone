namespace UlearnServices.Models.Tasks.CodeTasks
{
    public class CodeTaskDto
    {
        public int ModuleId { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        public string InitialCode { get; set; }
        public int Points { get; set; }
    }
}