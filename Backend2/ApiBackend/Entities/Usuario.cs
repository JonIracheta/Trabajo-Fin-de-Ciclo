using System.ComponentModel.DataAnnotations;

namespace ApiBackend.Entities
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string PrimerApellido { get; set; } = string.Empty;
        public string SegundoApellido { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Contraseña { get; set; } = string.Empty;
        public int? IdEquipo { get; set; }

        public Equipo? Equipo { get; set; }
    }

}
