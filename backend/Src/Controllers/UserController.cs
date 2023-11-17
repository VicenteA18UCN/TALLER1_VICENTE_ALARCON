using backend.Src.DTO;
using backend.Src.Data;
using backend.Src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        // Inyectamos el contexto para poder acceder a la base de datos
        public UserController(DataContext context)
        {
            // Guardamos en un atributo para utilizarlo cuando lo necesitemos
            _context = context;
        }

        [HttpPost("create")]
        public async Task<ActionResult<string>> Create(CreateUserDto createUser)
        {
            // Buscar al usuario por email
            var user = new User()
            {
                Name = createUser.Name,
                Lastname = createUser.Lastname,
                Email = createUser.Email,
                Rut = createUser.Rut,
                Points = createUser.Points,
                RoleId = 2
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return createUser.Email;
        }

        [HttpGet("read")]
        public async Task<ActionResult<string>> Obtain()
        {
            // Get all users
            var users = await _context.Users.ToListAsync();
            return Ok(users);

        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<string>> Update(UpdateUserDto updateUser, string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Rut == id);

            if (user == null) return BadRequest("Invalid Credentials");

            user.Name = updateUser.Name;
            user.Lastname = updateUser.Lastname;
            user.Email = updateUser.Email;
            user.Points = updateUser.Points;

            await _context.SaveChangesAsync();
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


