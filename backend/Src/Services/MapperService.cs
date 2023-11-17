using AutoMapper;
using backend.Src.DTO;
using backend.Src.DTO.Users;
using backend.Src.Models;
using backend.Src.Services.Interfaces;

namespace backend.Src.Services
{
    public class MapperService : IMapperService
    {
        private readonly IMapper _mapper;

        public MapperService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<UserDto> MapUsers(List<User> users)
        {
            var mappedUsers = users.Select(u => _mapper.Map<UserDto>(u)).ToList();
            return mappedUsers;
        }

        public User CreateClientDtoToUser(CreateUserDto clientUserDto)
        {
            var user = _mapper.Map<User>(clientUserDto);
            return user;
        }
    }
}