using AutoMapper;
using backend.Src.DTO.Users;
using backend.Src.Models;

namespace backend.Src.Extensions
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Role, RoleDto>();
        }
    }
}
