using backend.Src.Models;

namespace backend.Src.Data
{
    public class Seed
    {
        public async static void SeedData(DataContext context)
        {
            await SeedAdmins(context);
            await SeedUsers(context);
        }

        private async static Task SeedAdmins(DataContext context)
        {
            if (context.Admins.Any()) return;

            var admin = new List<Admin>(){
                                new(){

                    Username = "Ochietto",
                    Password =  BCrypt.Net.BCrypt.HashPassword("Jaqamain3pals", BCrypt.Net.BCrypt.GenerateSalt(12)),
                },

            };

            await context.Admins.AddRangeAsync(admin);
            await context.SaveChangesAsync();
        }

        private async static Task SeedUsers(DataContext context)
        {
            if (context.Users.Any()) return;

            var users = new List<User>(){
                new(){
                    Name= "Vicente Ignacio",
                    Lastname = "Alarcón Campillay",
                    Email = "vicente.alarcon@alumnos.ucn",
                    Rut = "21.177.605-6",
                    Points = 20
                },
                new(){
                    Name= "Gabriela Andrea",
                    Lastname = "González Mendoza",
                    Email = "gabriela@example.ucn",
                    Rut = "15.234.567-8",
                    Points = 18
                },

                new(){
                    Name= "Javier Felipe",
                    Lastname = "Molina Cortez",
                    Email = "javier@example.ucn",
                    Rut = "11.987.654-3",
                    Points = 15
                },

                new(){
                    Name= "María Antonia",
                    Lastname = "López Pérez",
                    Email = "maria@example.ucn",
                    Rut = "17.876.543-4",
                    Points = 25
                },

                new(){
                    Name= "Carlos Alberto",
                    Lastname = "Sánchez González",
                    Email = "carlos@example.ucn",
                    Rut = "13.765.432-5",
                    Points = 22
                },

                new(){
                    Name= "Alejandra Andrea",
                    Lastname = "Ramírez Fuentes",
                    Email = "alejandra@example.ucn",
                    Rut = "19.654.321-6",
                    Points = 30
                },

                new(){
                    Name= "Héctor Andrés",
                    Lastname = "Pérez Rojas",
                    Email = "hector@example.ucn",
                    Rut = "14.543.210-7",
                    Points = 17
                },

                new(){
                    Name= "Laura Andrea",
                    Lastname = "Fuentes Soto",
                    Email = "laura@example.ucn",
                    Rut = "10.432.109-8",
                    Points = 28
                },

                new(){
                    Name= "Francisco Javier",
                    Lastname = "Martínez Gómez",
                    Email = "francisco@example.ucn",
                    Rut = "16.321.098-9",
                    Points = 19
                },

                new(){
                    Name= "Isabel Antonia",
                    Lastname = "Torres Cruz",
                    Email = "isabel@example.ucn",
                    Rut = "18.210.987-0",
                    Points = 23
                },

                new(){
                    Name= "Rodrigo Andrés",
                    Lastname = "Gómez Rojas",
                    Email = "rodrigo@example.ucn",
                    Rut = "12.109.876-1",
                    Points = 27
                },

                new(){
                    Name= "Catalina Sofía",
                    Lastname = "Soto Pérez",
                    Email = "catalina@example.ucn",
                    Rut = "11.098.765-2",
                    Points = 24
                },

                new(){
                    Name= "Andrés Felipe",
                    Lastname = "Cruz Gutiérrez",
                    Email = "andres@example.ucn",
                    Rut = "15.987.654-3",
                    Points = 16
                },

                new(){
                    Name= "Mónica Loreto",
                    Lastname = "Rojas Martínez",
                    Email = "monica@example.ucn",
                    Rut = "14.876.543-4",
                    Points = 21
                },

                new(){
                    Name= "Eduardo Andrés",
                    Lastname = "Vargas Sánchez",
                    Email = "eduardo@example.ucn",
                    Rut = "13.765.432-5",
                    Points = 29
                },

                new(){
                    Name= "Patricia Andrea",
                    Lastname = "Gutiérrez Fuentes",
                    Email = "patricia@example.ucn",
                    Rut = "19.654.321-6",
                    Points = 26
                },

            };

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }
    }
}