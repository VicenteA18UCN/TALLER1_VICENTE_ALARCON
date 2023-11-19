using backend.Src.DTO;
using backend.Src.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Src.Services.Interfaces
{
    public interface IAuthService
    {
        public string? GenerateToken(string username, int id);
        public Task<bool> CheckCredentials(LoginAdminDto loginAdminDto);

        public Task<Admin?> GetAdmin(string username);
    }
}