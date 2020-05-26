using System.Collections.Generic;

namespace UlearnServices.Models.Group
{
    public class FullGroupDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CourseId { get; set; }
        public List<string> Emails { get; set; }
    }
}