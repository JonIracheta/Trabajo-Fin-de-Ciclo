using ApiBackend.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApiBackend.Entities
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
           : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Equipo> Equipos { get; set; }
        public DbSet<Panel> Paneles { get; set; }
        public DbSet<Tarea> Tareas { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Equipo>()
                .HasMany(e => e.Usuarios)
                .WithOne(u => u.Equipo)
                .HasForeignKey(u => u.IdEquipo)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Equipo>()
                .HasOne(e => e.Panel)
                .WithOne(p => p.Equipo)
                .HasForeignKey<Panel>(p => p.IdEquipo);

            modelBuilder.Entity<Panel>()
                .HasMany(p => p.Tareas)
                .WithOne(t => t.Panel)
                .HasForeignKey(t => t.IdPanel)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Tarea>()
                .Property(t => t.PorHacer)
                .HasColumnType("BOOLEAN");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=AgilePulseManager.db");
        }
    }
}
