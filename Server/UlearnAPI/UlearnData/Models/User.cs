using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace UlearnData.Models
{
    public class User : IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string ImageSrc { get; set; }
        
        public List<UserGroup> UserGroups { get; set; }
        public Subscription Subscription { get; set; }
    }
}