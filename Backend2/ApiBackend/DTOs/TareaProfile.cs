using ApiBackend.Entities;
using AutoMapper;

namespace ApiBackend.DTOs
{
    public class TareaProfile : Profile
    {
        public TareaProfile()
        {
            CreateMap<AgregarTareaDTO, Tarea>();
        }
    }
}
