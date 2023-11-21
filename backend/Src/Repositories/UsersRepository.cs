using backend.Src.Data;
using backend.Src.Models;
using backend.Src.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;

        public UsersRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Add(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Rut == user.Rut))
            {
                throw new Exception("El Rut ya existe");
            }
            else if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                throw new Exception("El Email ya existe");
            }

            var createdUser = (await _context.Users.AddAsync(user)).Entity;
            await _context.SaveChangesAsync();
            return createdUser;
        }

        public async Task<User> Update(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Rut == user.Rut))
            {
                throw new Exception("El Rut ya existe");
            }
            else if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                throw new Exception("El Email ya existe");
            }
            var updateUser = _context.Users.Update(user).Entity;
            await _context.SaveChangesAsync();
            return updateUser;

        }

        public async Task<User> Delete(User user)
        {
            var deletedUser = _context.Users.Remove(user).Entity;
            await _context.SaveChangesAsync();
            return deletedUser;
        }

        public async Task<List<User>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<User?> GetByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async Task<User?> GetByRut(string rut)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Rut == rut);
            return user;
        }
        public async Task<User?> GetById(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<Admin?> GetAdminByUsername(string username)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Username == username);
            return admin;
        }
    }
}