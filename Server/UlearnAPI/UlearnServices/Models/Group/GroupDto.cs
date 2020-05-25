using System.Collections.Generic;

namespace UlearnServices.Models.Group
{
    public class GroupDto
    {
        public string Name { get; set; }
        public int CourseId { get; set; }
        public List<string> Emails { get; set; }
    }
}