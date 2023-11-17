using backend.Src.Models;

namespace backend.Src.Repositories.Interfaces
{
    public interface IUsersRepository
    {
        public Task<User> Add(User user);
        public Task<User?> GetById(int id);

        public Task<User?> GetByEmail(string email);

        public Task<User?> GetByUsername(string username);

        public Task<List<User>> GetAll();
    }
}