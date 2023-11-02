using backend.Src.DTO.Users;
using backend.Src.Repositories.Interfaces;
using backend.Src.Services.Interfaces;

namespace backend.Src.Services
{
    public class UsersService : IUsersService
    {

        private readonly IUsersRepository _usersRepository;

        public UsersService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public async Task<List<UserDto>> GetAll()
        {
            var users = await _usersRepository.GetAll();

            var mappedUsers = users.Select(u => new UserDto()
            {
                Id = u.Id,
                Name = u.Name,
                Lastname = u.Lastname,
                Email = u.Email,
                Password = u.Password,
                Role = new RoleDto()
                {
                    Id = u.Role.Id,
                    Name = u.Role.Name
                }
            }).ToList();

            return mappedUsers;
        }
    }
}