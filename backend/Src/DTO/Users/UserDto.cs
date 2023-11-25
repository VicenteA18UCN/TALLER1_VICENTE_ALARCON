using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Src.DTO.Users
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Rut { get; set; } = null!;
        public int Points { get; set; } = 0;
        public int? AdminId { get; set; } = null;
        public AdminDto? Admin { get; set; }
    }
}