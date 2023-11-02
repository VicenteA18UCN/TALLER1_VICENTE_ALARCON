using backend.Src.Data;
using backend.Src.Repositories;
using backend.Src.Repositories.Interfaces;
using backend.Src.Services;
using backend.Src.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Extensions
{
    public static class AppServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            AddSwaggerGen(services);
            AddServices(services);
            AddDbContext(services);
        }

        private static void AddSwaggerGen(IServiceCollection services)
        {
            services.AddSwaggerGen();
        }

        private static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IUsersService, UsersService>();
        }

        private static void AddDbContext(IServiceCollection services)
        {
            // DI Dependency Injection
            // Inyectamos la base de datos (DataContext) a  partes de la aplicación donde sea necesario
            services.AddDbContext<DataContext>(opt => opt.UseSqlite("Data Source=Dumbo.db"));
        }
    }
}