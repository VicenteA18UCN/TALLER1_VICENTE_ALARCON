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

        public async Task<List<User>> GetAll()
        {
            var users = await _context.Users
                                    .Include(user => user.Role)
                                    .ToListAsync();
            return users;
        }

        public Task<User> GetByEmail()
        {
            //TODO: Implementar
            throw new NotImplementedException();
        }

        public Task<User> GetById()
        {
            //TODO: Implementar
            throw new NotImplementedException();
        }

        public Task<User> GetByUsername()
        {
            //TODO: Implementar
            throw new NotImplementedException();
        }
    }
}