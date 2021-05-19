using System.Collections.Generic;
using UlearnData.Models.Tasks;

namespace UlearnData.Models
{
    public class Course
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public Subscription Subscription { get; set; }

        public List<Module> Modules { get; set; }
    }
}