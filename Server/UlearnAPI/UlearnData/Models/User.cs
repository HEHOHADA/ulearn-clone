using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace UlearnData.Models
{
    public class User : IdentityUser
    {
        public List<Group> Groups { get; set; }
        public Subscription Subscription { get; set; }
    }
}