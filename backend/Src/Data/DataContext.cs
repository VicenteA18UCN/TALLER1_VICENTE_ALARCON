using backend.Src.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Data
{
    public class DataContext : DbContext
    {
        //Entity Framework Tables
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Admin> Admin { get; set; } = null!;
        public DataContext(DbContextOptions options) : base(options)
        {

        }
    }
}