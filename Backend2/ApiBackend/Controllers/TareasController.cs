using ApiBackend.DTOs;
using ApiBackend.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBackend.Controllers
{
    [ApiController]
    [Route("api/tareas")]
    public class TareasController : ControllerBase
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public TareasController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("agregar")]
        public async Task<IActionResult> AgregarTarea([FromBody] AgregarTareaDTO request)
        {
            try
            {
                var nuevaTarea = _mapper.Map<Tarea>(request);
                nuevaTarea.FechaCreacion = DateTime.Now; 

                _context.Tareas.Add(nuevaTarea);
                await _context.SaveChangesAsync();

                return Ok(new { Mensaje = "Tarea agregada correctamente" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al agregar tarea: {ex.Message}");
                return StatusCode(500, new { Mensaje = "Error interno del servidor", Error = ex.Message });
            }
        }

        // Otros métodos para manejar las tareas, como obtener todas las tareas, actualizar, eliminar, etc.
        // ...

        // Ejemplo de método para obtener todas las tareas
        [HttpGet("obtener-todas")]
        public async Task<IActionResult> ObtenerTodasLasTareas()
        {
            try
            {
                var tareas = await _context.Tareas.ToListAsync();
                return Ok(tareas);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener tareas: {ex.Message}");
                return StatusCode(500, new { Mensaje = "Error interno del servidor", Error = ex.Message });
            }
        }
    }
}
