using System.ComponentModel.DataAnnotations;

namespace ApiBackend.DTOs
{
    public class AgregarTareaDTO
    {
        [Required]
        public string NombreTarea { get; set; } = string.Empty;
        [Required]
        public string TipoTarea { get; set; } = string.Empty;
        [Required]
        public int HorasEstimadas { get; set; }
        [Required]
        public bool PorHacer {  get; set; }
    }
}
