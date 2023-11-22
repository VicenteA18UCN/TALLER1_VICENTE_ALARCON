using backend.Src.Data;
using System.Text;
using backend.Src.Repositories;
using backend.Src.Repositories.Interfaces;
using backend.Src.Services;
using backend.Src.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;



namespace backend.Src.Extensions
{
    public static class AppServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            AddSwaggerGen(services);
            AddRepositories(services);
            AddServices(services);
            AddDbContext(services);
            AddAutoMapper(services);
            AddAuthentication(services, config);
        }

        private static void AddAutoMapper(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Program).Assembly);
        }

        private static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<IUsersRepository, UsersRepository>();
            // services.AddScoped<IAdministratorsRepository, AdministratorsRepository>();
        }
        private static void AddSwaggerGen(IServiceCollection services)
        {
            services.AddSwaggerGen();
        }
        private static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IMapperService, MapperService>();
            services.AddScoped<IAuthService, AuthService>();
        }

        private static void AddDbContext(IServiceCollection services)
        {
            // DI Dependency Injection
            // Inyectamos la base de datos (DataContext) a  partes de la aplicación donde sea necesario
            services.AddDbContext<DataContext>(opt => opt.UseSqlite("Data Source=Dumbo.db"));
        }

        private static IServiceCollection AddAuthentication(IServiceCollection services, IConfiguration config)
        {
            var jwtSecret = config["JwtSettings:Secret"] ?? throw new Exception("JwtSettings:Secret is null");
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecret)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            return services;
        }

    }
}