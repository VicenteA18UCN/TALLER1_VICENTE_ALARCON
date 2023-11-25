using backend.Src.DTO.Users;
using backend.Src.DTO;
using backend.Src.Repositories.Interfaces;
using backend.Src.Services.Interfaces;
using backend.Src.Models;

namespace backend.Src.Services
{// Interfaz para mapear los DTOs con los modelos.
    public class UsersService : IUsersService
    {

        private readonly IUsersRepository _usersRepository;
        private readonly IMapperService _mapperService;



        public UsersService(IUsersRepository usersRepository, IMapperService mapperService)
        {
            _usersRepository = usersRepository;
            _mapperService = mapperService;
        }

        /// <summary>
        /// Método para obtener todos los usuarios.
        /// </summary>
        /// <returns>
        /// Retorna una lista con todos los usuarios.
        /// </returns>
        public async Task<List<UserDto>> GetAll()
        {
            var users = await _usersRepository.GetAll();
            var mappedUsers = _mapperService.MapUsers(users);
            return mappedUsers;
        }
        /// <summary>
        /// Método para añadir a un usuario, a través de un DTO.
        /// </summary>
        /// <param name="createUserDto">
        /// - createUserDto: DTO de usuario a añadir.
        /// </param>
        /// <returns>
        /// Retorna el usuario añadido.
        /// </returns>
        public async Task<CreateUserDto> AddUser(CreateUserDto createUserDto)
        {
            var user = _mapperService.CreateClientDtoToUser(createUserDto);
            var createdUser = await _usersRepository.Add(user);
            var mappedDto = _mapperService.MapToCreateUserDto(createdUser);
            return mappedDto;
        }

        /// <summary>
        /// Método para actualizar un usuario, a través de un DTO.
        /// </summary>
        /// <param name="updateUserDto">
        /// - updateUserDto: DTO de usuario a actualizar.
        /// </param>
        /// <param name="rut">
        /// - rut: Rut del usuario a actualizar.
        /// </param>
        /// <returns>
        /// Retorna el usuario actualizado.
        /// </returns>
        public async Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto, string rut)
        {
            var updatedUser = await _usersRepository.GetByRut(rut);
            if (updatedUser == null) throw new Exception("User not found");
            updatedUser = _mapperService.UpdateUserDtoToUser(updateUserDto, updatedUser);
            var user = await _usersRepository.Update(updatedUser);
            var mappedDto = _mapperService.MapToUpdateUserDto(user);
            return mappedDto;
        }
        /// <summary>
        /// Método para eliminar un usuario, a través de su id.
        /// </summary>
        /// <param name="id">
        /// - id: Id del usuario a eliminar.
        /// </param>
        /// <returns>
        /// Retorna una string con el mensaje "User deleted".
        /// </returns>
        public async Task<string> DeleteUser(int id)
        {
            var user = await _usersRepository.GetById(id);
            if (user == null) throw new Exception("User not found");
            var deletedUser = await _usersRepository.Delete(user);
            return "User deleted";
        }
        /// <summary>
        /// Método para obtener un usuario por su id.
        /// </summary>
        /// <param name="id">
        /// - id: Id del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns>
        public async Task<CreateUserDto> GetUserById(int id)
        {
            var user = await _usersRepository.GetById(id);
            if (user == null) throw new Exception("User not found");
            var mappedUser = _mapperService.MapToCreateUserDto(user);
            return mappedUser;
        }
        /// <summary>
        /// Método para obtener un usuario por su rut.
        /// </summary>
        /// <param name="rut">
        /// - rut: Rut del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns>
        public async Task<CreateUserDto> GetUserByRut(string rut)
        {
            var user = await _usersRepository.GetByRut(rut);
            if (user == null) throw new Exception("User not found");
            var mappedUser = _mapperService.MapToCreateUserDto(user);
            return mappedUser;
        }
        /// <summary>
        /// Método para obtener un usuario por su email.
        /// </summary>
        /// <param name="email">
        /// - email: Email del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns>
        public async Task<CreateUserDto> GetUserByEmail(string email)
        {
            var user = await _usersRepository.GetByEmail(email);
            if (user == null) throw new Exception("User not found");
            var mappedUser = _mapperService.MapToCreateUserDto(user);
            return mappedUser;
        }
        /// <summary>
        /// Método para chequear si un email ya existe. 
        /// </summary>
        /// <param name="email">
        /// - email: Email a chequear.
        /// </param>
        /// <returns>
        /// Retorna true si el email ya existe, false en caso contrario.
        /// </returns>
        public async Task<bool> CheckEmail(string email)
        {
            var user = await _usersRepository.GetByEmail(email);
            if (user == null) return false;
            return true;
        }
        /// <summary>
        /// Método para chequear si un rut ya existe.
        /// </summary>
        /// <param name="rut">
        /// - rut: Rut a chequear.
        /// </param>
        /// <returns>
        /// Retorna true si el rut ya existe, false en caso contrario.
        /// </returns> 
        public async Task<bool> CheckRut(string rut)
        {
            var user = await _usersRepository.GetByRut(rut);
            if (user == null) return false;
            return true;
        }

    }

}
