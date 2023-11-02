using backend.Src.Models;

namespace backend.Src.Repositories.Interfaces
{
    public interface IUsersRepository
    {
        public Task<User> GetById();

        public Task<User> GetByEmail();

        public Task<User> GetByUsername();

        public Task<List<User>> GetAll();
    }
}