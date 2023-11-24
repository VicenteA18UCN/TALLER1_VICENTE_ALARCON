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

        // La ruta es localhost:5267/api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginAdminDto loginUserDto)
        {
            var checkCredentials = await _authService.CheckCredentials(loginUserDto);
            if (!checkCredentials) return BadRequest("Invalid Credentials");

            var admin = await _authService.GetAdmin(loginUserDto.Username);
            if (admin == null) return BadRequest("Invalid Credentials");

            var user = await _authService.GetUser(admin.Id);
            if (user == null) return BadRequest("Invalid Credentials");

            var token = _authService.GenerateToken(user.Rut, admin.Id);
            if (string.IsNullOrEmpty(token)) return BadRequest("Token error");

            return Ok(new { Token = token });
        }
    }
}