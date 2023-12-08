using System.ComponentModel.DataAnnotations;

namespace ApiBackend.DTOs
{
    public class RegistrarUsuarioDTO
    {
        [Required]
        public string Nombre { get; set; } = string.Empty;
        [Required]
        public string PrimerApellido { get; set; } = string.Empty;
        [Required]
        public string SegundoApellido { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Contraseña { get; set; } = string.Empty;
    }
}
