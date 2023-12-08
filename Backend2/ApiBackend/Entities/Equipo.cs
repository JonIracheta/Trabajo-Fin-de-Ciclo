using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiBackend.Entities
{
    public class Equipo
    {
        [Key]
        public int IdEquipo { get; set; }
        public string NombreEquipo { get; set; } = string.Empty;

        [ForeignKey("IdEquipo")]
        public Panel Panel { get; set; } = new Panel();

        public List<Usuario> Usuarios { get; set; } 

        public Equipo() 
        {
            Usuarios = new List<Usuario>();
        }
    }

}
