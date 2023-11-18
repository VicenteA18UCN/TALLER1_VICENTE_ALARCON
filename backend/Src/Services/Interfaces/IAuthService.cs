using backend.Src.DTO;
using Microsoft.AspNetCore.Authorization;

namespace backend.Src.Services.Interfaces
{
    public interface IAuthService
    {
        public string? GenerateToken(string rut);

    }
}