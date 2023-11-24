using backend.Src.DTO.Users;
using backend.Src.DTO;
using backend.Src.Repositories.Interfaces;
using backend.Src.Services.Interfaces;
using backend.Src.Models;

namespace backend.Src.Services
{
    public class UsersService : IUsersService
    {

        private readonly IUsersRepository _usersRepository;
        private readonly IMapperService _mapperService;

        public UsersService(IUsersRepository usersRepository, IMapperService mapperService)
        {
            _usersRepository = usersRepository;
            _mapperService = mapperService;
        }

        public async Task<CreateUserDto> AddUser(CreateUserDto createUserDto)
        {
            var user = _mapperService.CreateClientDtoToUser(createUserDto);
            var createdUser = await _usersRepository.Add(user);
            var mappedDto = _mapperService.MapToCreateUserDto(createdUser);
            return mappedDto;
        }

        public async Task<List<UserDto>> GetAll()
        {
            var users = await _usersRepository.GetAll();
            var mappedUsers = _mapperService.MapUsers(users);
            return mappedUsers;
        }
        public async Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto, string rut)
        {
            var updatedUser = await _usersRepository.GetByRut(rut);
            if (updatedUser == null) throw new Exception("User not found");
            updatedUser = _mapperService.UpdateUserDtoToUser(updateUserDto, updatedUser);
            var user = await _usersRepository.Update(updatedUser);
            var mappedDto = _mapperService.MapToUpdateUserDto(user);
            return mappedDto;
        }

        public async Task<string> DeleteUser(int id)
        {
            var user = await _usersRepository.GetById(id);
            if (user == null) throw new Exception("User not found");
            var deletedUser = await _usersRepository.Delete(user);
            return "User deleted";
        }

        public async Task<CreateUserDto> GetUserById(int id)
        {
            var user = await _usersRepository.GetById(id);
            if (user == null) throw new Exception("User not found");
            var mappedUser = _mapperService.MapToCreateUserDto(user);
            return mappedUser;
        }
        public async Task<CreateUserDto> GetUserByRut(string rut)
        {
            var user = await _usersRepository.GetByRut(rut);
            if (user == null) throw new Exception("User not found");
            var mappedUser = _mapperService.MapToCreateUserDto(user);
            return mappedUser;
        }

        public async Task<CreateUserDto> GetUserByEmail(string email)
        {
            var user = await _usersRepository.GetByEmail(email);
            if (user == null) throw new Exception("User not found");
            var mappedUser = _mapperService.MapToCreateUserDto(user);
            return mappedUser;
        }

        public async Task<bool> CheckEmail(string email)
        {
            var user = await _usersRepository.GetByEmail(email);
            if (user == null) return false;
            return true;
        }

        public async Task<bool> CheckRut(string rut)
        {
            var user = await _usersRepository.GetByRut(rut);
            if (user == null) return false;
            return true;
        }

    }

}
