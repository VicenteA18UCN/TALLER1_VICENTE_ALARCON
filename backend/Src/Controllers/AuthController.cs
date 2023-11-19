using backend.Src.DTO;
using backend.Src.Data;
using backend.Src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Src.Services.Interfaces;

namespace backend.Src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAuthService _authService;

        // Inyectamos el contexto para poder acceder a la base de datos
        public AuthController(DataContext context, IAuthService authService)
        {
            // Guardamos en un atributo para utilizarlo cuando lo necesitemos
            _context = context;
            _authService = authService;

        }

        // La ruta es localhost:5267/api/auth/register
        // [HttpPost("register")]
        // public async Task<ActionResult<string>> Register(RegisterClientDto registerClientDto)
        // {
        //     // Generamos la sal
        //     var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        //     // Encriptamos la contraseña
        //     string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerClientDto.Password, salt);
        //     // Traspasamos la información del DTO al nuevo usuario a crear
        //     var user = new User()
        //     {
        //         Email = registerClientDto.Email,
        //         Name = registerClientDto.Name,
        //         Password = passwordHash,
        //         // El id de rol del usuario debe coincidir con el de cliente
        //         // más adelante vamos a utilizar una manera más elegante
        //         RoleId = 2
        //     };
        //     // Agregamos el nuevo usuario
        //     await _context.Users.AddAsync(user);
        //     // Guardamos los cambios
        //     await _context.SaveChangesAsync();
        //     // IMPORTANTE: Actualmente devolvemos el email, pero se deberia devolver la información
        //     // y su JWT
        //     return registerClientDto.Email;
        // }

        // La ruta es localhost:5267/api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginAdminDto loginUserDto)
        {
            var checkCredentials = await _authService.CheckCredentials(loginUserDto);
            if (!checkCredentials) return BadRequest("Invalid Credentials");

            var user = await _authService.GetAdmin(loginUserDto.Username);

            var token = _authService.GenerateToken(loginUserDto.Username, user.Id);
            if (string.IsNullOrEmpty(token)) return BadRequest("Token error");

            return Ok(new { Token = token });
        }
    }
}