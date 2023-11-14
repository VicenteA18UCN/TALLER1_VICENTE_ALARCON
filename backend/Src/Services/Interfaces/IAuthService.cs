namespace backend.Src.Services.Interfaces
{
    public interface IAuthService
    {
        public string? GenerateToken(string rut);
    }
}