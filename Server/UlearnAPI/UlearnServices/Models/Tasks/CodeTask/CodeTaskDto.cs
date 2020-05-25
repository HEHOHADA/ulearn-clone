namespace UlearnServices.Models.Tasks.CodeTask
{
    public class CodeTaskDto
    {
        public int ModuleId { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        public string InitialCode { get; set; }
    }
}