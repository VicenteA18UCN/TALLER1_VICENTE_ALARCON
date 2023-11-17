using backend.Src.DTO;
using backend.Src.DTO.Users;

namespace backend.Src.Services.Interfaces
{
    public interface IUsersService
    {
        public Task<List<UserDto>> GetAll();

        public Task<string> Create(CreateUserDto registerUserDto);

    }
}