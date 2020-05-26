using System.ComponentModel.DataAnnotations;

namespace UlearnServices.Models.Account
{
    public class FullUserInfoDto
    {
        [Required] public string Email { get; set; }
        [Required] public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }
}