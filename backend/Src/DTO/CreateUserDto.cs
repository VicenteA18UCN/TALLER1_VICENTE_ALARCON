using System.ComponentModel.DataAnnotations;

namespace backend.Src.DTO
{
    public class CreateUserDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Lastname { get; set; } = string.Empty;
        [Required]
        public string Rut { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public int Points { get; set; } = 0;


    }
}