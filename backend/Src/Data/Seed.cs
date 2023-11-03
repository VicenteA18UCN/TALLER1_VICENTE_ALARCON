using backend.Src.Models;

namespace backend.Src.Data
{
    public class Seed
    {
        public async static void SeedData(DataContext context)
        {
            await SeedRoles(context);
            await SeedUsers(context);
        }

        private async static Task SeedRoles(DataContext context)
        {
            if (context.Roles.Any()) return;

            var roles = new List<Role>(){
                new(){
                    Name = "admin"
                },
                new(){
                    Name = "client"
                }
            };

            await context.Roles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }

        private async static Task SeedUsers(DataContext context)
        {
            if (context.Users.Any()) return;

            var users = new List<User>(){
                new(){
                    Name= "Admin",
                    Lastname = "Admin",
                    Username = "Ochietto",
                    Email = "Admin",
                    Password =  BCrypt.Net.BCrypt.HashPassword("Jaqamain3pals", BCrypt.Net.BCrypt.GenerateSalt(12)),
                    RoleId = 1,
                    Points = 0
                },
            };

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }
    }
}