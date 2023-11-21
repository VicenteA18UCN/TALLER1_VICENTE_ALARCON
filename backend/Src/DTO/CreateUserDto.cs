using System.ComponentModel.DataAnnotations;

namespace backend.Src.DTO
{
    public class CreateUserDto
    {
        public int Id { get; set; }
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
        [Range(0, int.MaxValue, ErrorMessage = "Los puntos deben ser mayores o iguales a cero")]
        public int Points { get; set; } = 0;


    }
}