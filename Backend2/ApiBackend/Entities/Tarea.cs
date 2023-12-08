using System.ComponentModel.DataAnnotations;

namespace ApiBackend.Entities
{
    public class Tarea
    {
        [Key]
        public int IdTarea { get; set; }
        public int IdPanel { get; set; }
        public string NombreTarea { get; set; } = string.Empty;
        public string TipoTarea {  get; set; } = string.Empty;
        public int HorasEstimadas { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool PorHacer { get; set; }
        public bool EnDesarrollo { get; set; }
        public bool Resuelta { get; set; }
        
        public Panel? Panel { get; set; }
    }
}
