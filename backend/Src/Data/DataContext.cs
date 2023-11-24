using backend.Src.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Data
{
    //Entity Framework Context: Esta clase es la encargada de conectarse a la base de datos y de crear las tablas.
    public class DataContext : DbContext
    {
        /// <summary>
        ///   Users: Tabla de usuarios.
        /// </summary>
        /// 
        public DbSet<User> Users { get; set; } = null!;
        /// <summary>
        ///   Admins: Tabla de administradores.
        /// </summary>
        /// 
        public DbSet<Admin> Admins { get; set; } = null!;


        /// <summary>
        /// Representa el contexto de la base de datos.
        /// </summary>
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        /// <summary>
        /// Este método permite configurar las tablas de la base de datos.
        /// Se define que el rut y el email de los usuarios deben ser únicos.
        /// </summary>
        /// <param name="modelBuilder">
        /// - modelBuilder: Constructor de modelos.
        /// </param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
            .HasIndex(u => u.Rut).IsUnique();

            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}