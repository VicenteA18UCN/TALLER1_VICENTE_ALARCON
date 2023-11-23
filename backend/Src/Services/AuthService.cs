using backend.Src.Services.Interfaces;
using backend.Src.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Src.DTO;
using backend.Src.Util;
using backend.Src.Models;
namespace backend.Src.Services
{
    public class AuthService : IAuthService
    {
        private readonly string _jwtSecret;
        private readonly IUsersRepository _usersRepository;
        public AuthService(IConfiguration config, IUsersRepository usersRepository)
        {
            var token = config.GetValue<string>("JwtSettings:Secret") ?? throw new ArgumentNullException("JwtSettings:Secret is null");
            _jwtSecret = token;
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
        }

        public string? GenerateToken(string username, int id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                    new Claim(ClaimTypes.Name, username),

                }),
                Expires = DateTime.UtcNow.AddSeconds(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<bool> CheckCredentials(LoginAdminDto loginAdminDto)
        {
            if (string.IsNullOrEmpty(loginAdminDto.Username) || string.IsNullOrEmpty(loginAdminDto.Password))
            {
                return false;
            }

            var user = await _usersRepository.GetAdminByUsername(loginAdminDto.Username);
            if (user == null) return false;
            return BCryptHelper.CheckPassword(loginAdminDto.Password, user.Password);
        }

        public async Task<Admin?> GetAdmin(string username)
        {
            var admin = await _usersRepository.GetAdminByUsername(username);
            return admin;
        }
    }
}