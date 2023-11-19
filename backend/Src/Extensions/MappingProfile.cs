using AutoMapper;
using backend.Src.DTO.Users;
using backend.Src.DTO;
using backend.Src.Models;

namespace backend.Src.Extensions
{
    public class MappingProfile : Profile
    {
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
