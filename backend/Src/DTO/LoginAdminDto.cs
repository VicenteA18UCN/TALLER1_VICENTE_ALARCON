using System.ComponentModel.DataAnnotations;

namespace backend.Src.DTO
{
    public class LoginAdminDto
    {

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}