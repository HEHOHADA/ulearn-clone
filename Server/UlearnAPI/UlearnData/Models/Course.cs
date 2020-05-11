using System.Collections.Generic;
using UlearnData.Models.Tasks;
using UlearnData.Models.Tasks.CodeTask;
using UlearnData.Models.Tasks.TestTask;
using UlearnData.Models.Tasks.VideoTask;

namespace UlearnData.Models
{
    public class Course
    {
        public int Id { get; set; }
        
        public Subscription Subscription { get; set; }
        
        public List<Module> Modules { get; set; }
    }
}