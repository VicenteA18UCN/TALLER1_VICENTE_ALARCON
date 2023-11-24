using backend.Src.Data;
using backend.Src.Models;
using backend.Src.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Repositories
{
    // Repositorio para los usuarios.
    public class UsersRepository : IUsersRepository
    {
        /// <summary>
        /// Contexto de la base de datos.
        /// </summary>
        private readonly DataContext _context;

        //Constructor:
        public UsersRepository(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Método para agregar un usuario.
        /// </summary>
        /// <param name="user">
        /// - user: Usuario a agregar.
        /// </param>
        /// <returns>
        /// Retorna el usuario agregado.
        /// </returns>
        public async Task<User> Add(User user)
        {
            var createdUser = (await _context.Users.AddAsync(user)).Entity;
            await _context.SaveChangesAsync();
            return createdUser;
        }
        /// <summary>
        /// Método para actualizar un usuario.
        /// </summary>
        /// <param name="user">
        /// - user: Usuario a actualizar.
        /// </param>
        /// <returns>
        /// Retorna el usuario actualizado.
        /// </returns>
        public async Task<User> Update(User user)
        {
            var updateUser = _context.Users.Update(user).Entity;
            await _context.SaveChangesAsync();
            return updateUser;

        }
        /// <summary>
        /// Método para eliminar un usuario.
        /// </summary>
        /// <param name="user">
        /// - user: Usuario a eliminar.
        /// </param>
        /// <returns>
        /// Retorna el usuario eliminado.
        /// </returns>
        public async Task<User> Delete(User user)
        {
            var deletedUser = _context.Users.Remove(user).Entity;
            await _context.SaveChangesAsync();
            return deletedUser;
        }
        /// <summary>
        /// Método para obtener todos los usuarios. Excluye a los administradores.
        /// </summary>
        /// <returns>
        /// Retorna una lista con todos los usuarios.
        /// </returns>
        public async Task<List<User>> GetAll()
        {
            var users = await _context.Users
                .Where(user => user.AdminId == null)
                .ToListAsync();

            return users;
        }
        /// <summary>
        /// Método para obtener un usuario por su id.
        /// </summary>
        /// <param name="id">
        /// - id: Id del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns>
        public async Task<User?> GetById(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
        /// <summary>
        /// Método para obtener un usuario por su email.
        /// </summary>
        /// <param name="email">
        /// - email: Email del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns> 
        public async Task<User?> GetByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }
        /// <summary>
        /// Método para obtener un usuario por su rut.
        /// </summary>
        /// <param name="rut">
        /// - rut: Rut del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns>
        public async Task<User?> GetByRut(string rut)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Rut == rut);
            return user;
        }
        /// <summary>
        /// Método para obtener un administrador por su username.
        /// </summary>
        /// <param name="username">
        /// - username: Username del administrador a obtener.
        /// </param>
        /// <returns>
        /// Retorna el administrador obtenido.
        /// </returns>
        public async Task<Admin?> GetAdminByUsername(string username)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Username == username);
            return admin;
        }
        /// <summary>
        /// Método para obtener un usuario por su id de administrador.
        /// </summary>
        /// <param name="adminId">
        /// - adminId: Id del administrador del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna al administrador obtenido.
        /// </returns>
        public async Task<User?> GetUserByAdminId(int adminId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.AdminId == adminId);
            return user;
        }
    }
}