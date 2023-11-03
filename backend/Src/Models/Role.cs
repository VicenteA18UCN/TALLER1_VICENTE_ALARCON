namespace backend.Src.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        //Entity Framework Relationships

        public List<User> Users { get; set; } = new();
    }
}