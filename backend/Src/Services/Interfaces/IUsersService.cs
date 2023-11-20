using backend.Src.DTO;
using backend.Src.DTO.Users;

namespace backend.Src.Services.Interfaces
{
    public interface IUsersService
    {
        public Task<List<UserDto>> GetAll();
        public Task<CreateUserDto> AddUser(CreateUserDto createUserDto);
        public Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto, string rut);
        public Task<string> DeleteUser(int id);
        public Task<CreateUserDto> GetUserByRut(string rut);


    }
}