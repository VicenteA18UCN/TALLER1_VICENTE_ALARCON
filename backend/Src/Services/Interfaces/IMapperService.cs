using backend.Src.DTO.Users;
using backend.Src.DTO;
using backend.Src.Models;

namespace backend.Src.Services.Interfaces
{
    // Interfaz para mapear los DTOs con los modelos.
    public interface IMapperService
    {
        /// <summary>
        /// Método para mapear a todos los usuarios a DTOs.
        /// </summary>
        /// <param name="users">
        /// - users: Lista de usuarios a mapear.
        /// </param>
        /// <returns>
        /// Retorna una lista con todos los usuarios mapeados.
        /// </returns>
        public List<UserDto> MapUsers(List<User> users);
        /// <summary>
        /// Método para mapear un DTO de usuario a un modelo de usuario (para crear).
        /// </summary>
        /// <param name="clientUserDto">
        /// - clientUserDto: DTO de usuario a mapear.
        /// </param>
        /// <returns>
        /// Retorna el usuario mapeado.
        /// </returns>
        public User CreateClientDtoToUser(CreateUserDto createUserDto);
        /// <summary>
        /// Método para mapear un DTO de usuario a un modelo de usuario (para actualizar).
        /// </summary>
        /// <param name="updateUserDto">
        /// - updateUserDto: DTO de usuario a mapear.
        /// </param>
        /// <returns>
        /// Retorna el usuario mapeado.
        /// </returns>
        public User UpdateUserDtoToUser(UpdateUserDto updateUserDto, User user);
        /// <summary>
        /// Método para mapear un modelo de usuario a un DTO de usuario.
        /// </summary>
        /// <param name="user">
        /// - user: Usuario a mapear.
        /// </param>
        /// <returns>
        /// Retorna el DTO de usuario mapeado.
        /// </returns> 
        public UpdateUserDto MapToUpdateUserDto(User user);
        /// <summary>
        /// Método para mapear un modelo de usuario a un DTO de usuario.
        /// </summary>
        /// <param name="user">
        /// - user: Usuario a mapear.
        /// </param>
        /// <returns>
        /// Retorna el DTO de usuario mapeado.
        /// </returns>
        public CreateUserDto MapToCreateUserDto(User user);


    }
}