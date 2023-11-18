using backend.Src.Models;

namespace backend.Src.Data
{
    public class Seed
    {
        public async static void SeedData(DataContext context)
        {
            await SeedAdmin(context);
            await SeedUsers(context);
        }

        private async static Task SeedAdmin(DataContext context)
        {
            if (context.Admin.Any()) return;

            var admin = new List<Admin>(){
                                new(){

                    Username = "Ochietto",
                    Password =  BCrypt.Net.BCrypt.HashPassword("Jaqamain3pals", BCrypt.Net.BCrypt.GenerateSalt(12)),
                },

            };

            await context.Admin.AddRangeAsync(admin);
            await context.SaveChangesAsync();
        }

        private async static Task SeedUsers(DataContext context)
        {
            if (context.Users.Any()) return;

            var users = new List<User>(){
                new(){
                    Name= "Vicente",
                    Lastname = "Alarcón",
                    Email = "vicente.alarcon@alumnos.ucn",
                    Rut = "21.177.605-6",
                    Points = 20
                },
            };

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }
    }
}