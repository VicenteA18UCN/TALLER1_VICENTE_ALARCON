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
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class UserController : ControllerBase
    {

        private readonly IUsersService _usersService;

        // Inyectamos el contexto para poder acceder a la base de datos
        public UserController(IUsersService usersService, IAuthService authService)
        {

            _usersService = usersService;
        }

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

        [HttpGet("read")]
        public async Task<ActionResult<string>> GetUsers()
        {
            // Get all users
            var users = await _usersService.GetAll();
            return Ok(users);

        }

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

        [HttpGet("search/{rut}")]
        public async Task<ActionResult<CreateUserDto>> GetUser(string rut)
        {
            var user = await _usersService.GetUserByRut(rut);
            return Ok(user);
        }
    }
}


