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
        public async Task<ActionResult<string>> Create(CreateUserDto createUser)
        {
            await _usersService.AddUser(createUser);
            return createUser.Email;
        }

        [HttpGet("read")]
        public async Task<ActionResult<string>> Read()
        {
            // Get all users
            var users = await _usersService.GetAll();
            return Ok(users);

        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<string>> Update(UpdateUserDto updateUser, string id)
        {
            await _usersService.UpdateUser(updateUser, id);
            return updateUser.Email;
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Rut == id);

            if (user == null) return BadRequest("Invalid Credentials");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok("User deleted");
        }
    }
}


