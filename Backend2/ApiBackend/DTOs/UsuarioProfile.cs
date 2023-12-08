using ApiBackend.Entities;
using AutoMapper;

namespace ApiBackend.DTOs
{
    public class UsuarioProfile : Profile
    {
        public UsuarioProfile()
        {
            CreateMap<RegistrarUsuarioDTO, Usuario>();
        }
    }
}
