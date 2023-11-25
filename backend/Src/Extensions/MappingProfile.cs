using AutoMapper;
using backend.Src.DTO.Users;
using backend.Src.DTO;
using backend.Src.Models;

namespace backend.Src.Extensions
{
    // Esta clase es para mapear los DTOs con los modelos.
    public class MappingProfile : Profile
    {
        /// <summary>
        /// Se encarga de mapear los DTOs con los modelos.
        /// </summary>
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Admin, AdminDto>();
            CreateMap<User, UpdateUserDto>();
            CreateMap<User, CreateUserDto>();
            CreateMap<CreateUserDto, User>();
        }
    }
}
