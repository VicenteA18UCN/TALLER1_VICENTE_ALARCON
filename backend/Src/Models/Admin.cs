namespace backend.Src.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public User? User { get; set; }

    }
}