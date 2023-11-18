using backend.Src.DTO;
using backend.Src.DTO.Users;

namespace backend.Src.Services.Interfaces
{
    public interface IUsersService
    {
        public Task<List<UserDto>> GetAll();

        public Task<string> AddUser(CreateUserDto createUserDto);
        public Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto, string rut);

    }
}