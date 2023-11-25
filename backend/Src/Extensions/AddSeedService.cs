using backend.Src.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Extensions
{
    // Extensión para agregar el servicio de seed.
    public class AppSeedService
    {
        /// <summary>
        /// Método para agregar el servicio de seed.
        /// </summary>
        /// <param name="app">
        /// - app: Aplicación web.
        /// </param>
        public static void SeedDatabase(WebApplication app)
        {
            var scope = app.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<DataContext>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {
                // Migrate the database, create if it doesn't exist
                context.Database.Migrate();
                Seed.SeedData(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, " A problem ocurred during seeding");
            }
        }
    }
}