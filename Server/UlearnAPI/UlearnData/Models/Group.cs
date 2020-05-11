using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace UlearnData.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public Course Course { get; set; }

        public List<UserGroup> UserGroups { get; set; }
    }
}