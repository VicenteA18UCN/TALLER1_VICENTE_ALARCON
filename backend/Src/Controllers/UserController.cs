using backend.Src.DTO;
using backend.Src.Data;
using backend.Src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Src.Services.Interfaces;
using backend.Src.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.Src.Controllers
{
    //Controlador de usuarios.
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class UserController : ControllerBase
    {

        /// <summary>
        /// Atributos:
        ///   - _usersService: Servicio de usuarios.
        /// </summary>
        private readonly IUsersService _usersService;

        //Constructor:
        public UserController(IUsersService usersService)
        {

            _usersService = usersService;
        }

        /// <summary>
        /// Este método permite crear un usuario a partir de un objeto CreateUserDto. Para crearlo se debe estar autenticado como administrador.
        /// </summary>
        /// <param name="createUser">
        ///   - Rut: Rut del usuario.
        ///   - Name: Nombres del usuario.
        ///   - Lastname: Apellidos del usuario.
        ///   - Email: Email del usuario.
        ///   - Points: Puntos del usuario.
        /// </param>
        /// <returns>
        /// Retorna el usuario creado. Además, ingresa al usuario a la base de datos.
        /// En caso de que el rut ya exista, retorna un BadRequest, con el mensaje "Rut already exists".
        /// En caso de que el email ya exista, retorna un BadRequest, con el mensaje "Email already exists".
        /// </returns>
        [HttpPost("create")]
        public async Task<ActionResult<CreateUserDto>> CreateUser(CreateUserDto createUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existsRut = await _usersService.CheckRut(createUser.Rut);
            if (existsRut)
            {
                ModelState.AddModelError("Rut", "Rut already exists");
            }

            var existsEmail = await _usersService.CheckEmail(createUser.Email);
            if (existsEmail)
            {
                ModelState.AddModelError("Email", "Email already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return await _usersService.AddUser(createUser);
        }
        /// <summary>
        /// Este método permite obtener todos los usuarios. Para obtenerlos se debe estar autenticado como administrador.
        /// </summary>
        /// <returns>
        /// Retorna una lista con todos los usuarios.
        /// </returns> 
        [HttpGet("read")]
        public async Task<ActionResult<string>> GetUsers()
        {
            var users = await _usersService.GetAll();
            return Ok(users);
        }

        /// <summary>
        /// Este método permite actualizar un usuario a partir de un objeto UpdateUserDto. Para actualizarlo se debe estar autenticado como administrador.
        /// </summary>
        /// <param name="updateUser">
        ///     - Name: Nombres del usuario.
        ///     - Lastname: Apellidos del usuario.
        ///     - Email: Email del usuario.
        ///     - Points: Puntos del usuario.
        /// </param>
        /// <param name="rut">
        ///    - Rut: Rut del usuario a actualizar.
        /// </param>
        /// <returns>
        /// Retorna el usuario actualizado. Además, actualiza al usuario en la base de datos.
        /// En caso de que el email ya exista, retorna un BadRequest, con el mensaje "Email already exists".
        /// </returns>
        [HttpPut("update/{rut}")]
        public async Task<ActionResult<UpdateUserDto>> UpdateUser(UpdateUserDto updateUser, string rut)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _usersService.GetUserByRut(rut);

            var existsEmail = await _usersService.CheckEmail(updateUser.Email);
            if (existsEmail && user.Email != updateUser.Email)
            {
                ModelState.AddModelError("Email", "Email already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            return await _usersService.UpdateUser(updateUser, rut);
        }

        /// <summary>
        /// Este método permite eliminar un usuario. Para eliminarlo se debe estar autenticado como administrador.
        /// </summary>
        /// <param name="id">
        ///   - Id: Id del usuario a eliminar.
        /// </param>
        /// <returns>
        /// Retorna un mensaje de confirmación. Además elimina al usuario de la base de datos.
        /// En caso de que el usuario sea administrador, retorna un BadRequest, con el mensaje "User is admin". 
        /// </returns>
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> DeleteUser(int id)
        {

            var user = await _usersService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            if (user.AdminId != null)
            {
                return BadRequest("User is admin");
            }

            await _usersService.DeleteUser(id);
            return Ok("User deleted");
        }

    }
}


