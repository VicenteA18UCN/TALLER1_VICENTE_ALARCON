namespace backend.Src.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Rut { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Points { get; set; } = 0;

        public int? AdminId { get; set; }
        public Admin? Admin { get; set; }

    }
}