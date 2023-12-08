using System.ComponentModel.DataAnnotations;

namespace ApiBackend.Entities
{
    public class Panel
    {
        [Key]
        public int IdPanel { get; set; }
        public string NombrePanel { get; set; } = string.Empty;
        public Equipo Equipo { get; set; } = new Equipo();
        public int IdEquipo { get; set; }
        public List<Tarea> Tareas { get; set; }

        public Panel()
        {
            Tareas = new List<Tarea>();
        }
    }

}
