using backend.Src.DTO;
using backend.Src.Data;
using backend.Src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Src.Services.Interfaces;
using backend.Src.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.Src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUsersService _usersService;

        // Inyectamos el contexto para poder acceder a la base de datos
        public UserController(DataContext context, IUsersService usersService)
        {
            // Guardamos en un atributo para utilizarlo cuando lo necesitemos
            _context = context;
            _usersService = usersService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<CreateUserDto>> CreateUser(CreateUserDto createUser)
        {

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

            return await _usersService.UpdateUser(updateUser, rut);
        }

        [HttpDelete("delete/{rut}")]
        public async Task<ActionResult<string>> DeleteUser(string rut)
        {
            await _usersService.DeleteUser(rut);
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


