namespace UlearnData.Models.Tasks.CodeTask
{
    public class CodeTask
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        
        public Module Module { get; set; }
    }
}