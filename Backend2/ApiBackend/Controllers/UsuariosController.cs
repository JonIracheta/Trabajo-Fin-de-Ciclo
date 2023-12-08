using ApiBackend.DTOs;
using ApiBackend.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiBackend.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public UsuariosController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost("registrar")]
        public async Task<IActionResult> RegistrarUsuario([FromBody] RegistrarUsuarioDTO request)
        {
            try
            {
                var nuevoUsuario = _mapper.Map<Usuario>(request);
                if (ModelState.IsValid)
                {
                    _context.Usuarios.Add(nuevoUsuario);
                    await _context.SaveChangesAsync();
                    return Ok(new { Message = "Usuario registrado correctamente" });
                }

                return BadRequest(new { Message = "Error en los datos proporcionados" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al registrar usuario: {ex.Message}");
                return StatusCode(500, new { Message = "Error interno del servidor", Error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> IniciarSesion([FromBody] LoginDTO request)
        {
            try
            {
                var usuario = await _context.Usuarios
                    .FirstOrDefaultAsync(u => u.Email == request.Email);

                if (usuario == null)
                {
                    return BadRequest(new { Mensaje = "Usuario no encontrado" });
                }

                // Verifica si la contraseña proporcionada coincide con la contraseña del usuario
                if (usuario.Contraseña != request.Contraseña)
                {
                    return BadRequest(new { Mensaje = "Contraseña incorrecta" });
                }

                return Ok(new { Mensaje = "Inicio de sesión exitoso" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al iniciar sesión: {ex.Message}");
                return StatusCode(500, new { Mensaje = "Error interno del servidor", Error = ex.Message });
            }
        }

    }
}
