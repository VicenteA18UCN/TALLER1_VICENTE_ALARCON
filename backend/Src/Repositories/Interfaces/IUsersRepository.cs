using backend.Src.Models;

namespace backend.Src.Repositories.Interfaces
{
    public interface IUsersRepository
    {
        public Task<User> Add(User user);
        public Task<User> Update(User user);
        public Task<User> Delete(User user);
        public Task<User?> GetById(int id);

        public Task<User?> GetByEmail(string email);
        public Task<User?> GetByRut(string rut);
        public Task<List<User>> GetAll();
        public Task<Admin?> GetAdminByUsername(string username);
    }
}