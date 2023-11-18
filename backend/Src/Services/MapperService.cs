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

        public User UpdateUserDtoToUser(UpdateUserDto updateUserDto, User user)
        {
            try
            {
                user.Name = updateUserDto.Name;
                user.Lastname = updateUserDto.Lastname;
                user.Email = updateUserDto.Email;
                user.Points = updateUserDto.Points;
                return user;
            }
            catch (AutoMapperMappingException ex)
            {
                var errorMessage = $"Error mapping UpdateUserDto to User. Mapping details: {ex.Message}";
                throw new AutoMapperMappingException(errorMessage, ex);
            }
        }

        public UpdateUserDto MapToUpdateUserDto(User user)
        {
            var updateUserDto = _mapper.Map<UpdateUserDto>(user);
            return updateUserDto;
        }
    }
}