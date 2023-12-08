using System.ComponentModel.DataAnnotations;

namespace ApiBackend.DTOs
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Contraseña { get; set; } = string.Empty;
    }
}
