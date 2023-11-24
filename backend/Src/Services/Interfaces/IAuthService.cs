using backend.Src.DTO;
using backend.Src.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Src.Services.Interfaces
{
    // Interfaz para el servicio de autenticación.
    public interface IAuthService
    {
        /// <summary>
        ///  Método para generar un token. Genera un token con el rut y el id del administrador.
        /// </summary>
        /// <param name="username">
        /// - rut: Rut del administrador.
        /// </param>
        /// <param name="id">
        /// - id: Id del administrador.
        /// </param>
        /// <returns>
        /// Retorna el token generado.
        /// </returns>
        public string? GenerateToken(string rut, int id);
        /// <summary>
        /// Método para verificar las credenciales de un administrador.
        /// </summary>
        /// <param name="loginAdminDto">
        /// - loginAdminDto: Objeto con las credenciales del administrador.
        /// </param>
        /// <returns>
        /// Retorna true si las credenciales son válidas, false en caso contrario.
        /// </returns>
        public Task<bool> CheckCredentials(LoginAdminDto loginAdminDto);
        /// <summary>
        /// Método para obtener un administrador por su nombre de usuario.
        /// </summary>
        /// <param name="username">
        public Task<Admin?> GetAdmin(string username);
        /// <summary>
        /// Método para obtener un usuario por su id de administrador.
        /// </summary>
        /// <param name="adminId">
        /// - adminId: Id del administrador del usuario a obtener.
        /// </param>
        public Task<User?> GetUser(int adminId);
    }
}