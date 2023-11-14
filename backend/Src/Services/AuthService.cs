using backend.Src.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
namespace backend.Src.Services
{
    public class AuthService : IAuthService
    {
        private readonly string _jwtSecret;

        public AuthService(IConfiguration config)
        {
            var token = config.GetValue<string>("JwtSettings:Secret") ?? throw new ArgumentNullException("JwtSettings:Secret is null");
            _jwtSecret = token;
        }

        public string? GenerateToken(string rut)
        {
            // var tokenHandler = new JwtSecurityTokenHandler();
            // var key = Encoding.ASCII.GetBytes(_jwtSecret);

            // var tokenDescriptor = new SecurityTokenDescriptor
            // {
            //     Subject = new ClaimsIdentity(new Claim[]{
            //         new Claim(ClaimTypes.NameIdentifier, rut)
            //     }),
            //     Expires = DateTime.UtcNow.AddDays(7),
            //     SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

            // };

            // var token = tokenHandler.CreateToken(tokenDescriptor);
            return rut;
        }

    }
}