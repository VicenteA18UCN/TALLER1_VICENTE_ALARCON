namespace backend.Src.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Points { get; set; } = 0;

        //Entity Framework Relationships
        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;


    }
}