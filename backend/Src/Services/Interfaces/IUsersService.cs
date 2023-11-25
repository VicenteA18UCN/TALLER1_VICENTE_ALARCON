using backend.Src.DTO;
using backend.Src.DTO.Users;

namespace backend.Src.Services.Interfaces
{
    // Interfaz para mapear los DTOs con los modelos.
    public interface IUsersService
    {
        /// <summary>
        /// Método para obtener todos los usuarios.
        /// </summary>
        /// <returns>
        /// Retorna una lista con todos los usuarios.
        /// </returns>
        public Task<List<UserDto>> GetAll();
        /// <summary>
        /// Método para añadir a un usuario, a través de un DTO.
        /// </summary>
        /// <param name="createUserDto">
        /// - createUserDto: DTO de usuario a añadir.
        /// </param>
        /// <returns>
        /// Retorna el usuario añadido.
        /// </returns>
        public Task<CreateUserDto> AddUser(CreateUserDto createUserDto);
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
        public Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto, string rut);
        /// <summary>
        /// Método para eliminar un usuario, a través de su id.
        /// </summary>
        /// <param name="id">
        /// - id: Id del usuario a eliminar.
        /// </param>
        /// <returns>
        /// Retorna una string con el mensaje "User deleted".
        /// </returns>
        public Task<string> DeleteUser(int id);
        /// <summary>
        /// Método para obtener un usuario por su id.
        /// </summary>
        /// <param name="id">
        /// - id: Id del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns>
        public Task<CreateUserDto> GetUserById(int id);
        /// <summary>
        /// Método para obtener un usuario por su rut.
        /// </summary>
        /// <param name="rut">
        /// - rut: Rut del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns>
        public Task<CreateUserDto> GetUserByRut(string rut);
        /// <summary>
        /// Método para obtener un usuario por su email.
        /// </summary>
        /// <param name="email">
        /// - email: Email del usuario a obtener.
        /// </param>
        /// <returns>
        /// Retorna el usuario obtenido.
        /// </returns>
        public Task<CreateUserDto> GetUserByEmail(string email);
        /// <summary>
        /// Método para chequear si un email ya existe. 
        /// </summary>
        /// <param name="email">
        /// - email: Email a chequear.
        /// </param>
        /// <returns>
        /// Retorna true si el email ya existe, false en caso contrario.
        /// </returns>
        public Task<bool> CheckEmail(string email);
        /// <summary>
        /// Método para chequear si un rut ya existe.
        /// </summary>
        /// <param name="rut">
        /// - rut: Rut a chequear.
        /// </param>
        /// <returns>
        /// Retorna true si el rut ya existe, false en caso contrario.
        /// </returns> 
        public Task<bool> CheckRut(string rut);
    }
}