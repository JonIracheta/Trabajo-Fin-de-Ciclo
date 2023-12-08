using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiBackend.Migrations
{
    /// <inheritdoc />
    public partial class añadidaTareas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tareas",
                columns: table => new
                {
                    IdTarea = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IdPanel = table.Column<int>(type: "INTEGER", nullable: false),
                    NombreTarea = table.Column<string>(type: "TEXT", nullable: false),
                    TipoTarea = table.Column<string>(type: "TEXT", nullable: false),
                    HorasEstimadas = table.Column<int>(type: "INTEGER", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PorHacer = table.Column<bool>(type: "INTEGER", nullable: false),
                    EnDesarrollo = table.Column<bool>(type: "INTEGER", nullable: false),
                    Resuelta = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tareas", x => x.IdTarea);
                    table.ForeignKey(
                        name: "FK_Tareas_Paneles_IdPanel",
                        column: x => x.IdPanel,
                        principalTable: "Paneles",
                        principalColumn: "IdPanel",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tareas_IdPanel",
                table: "Tareas",
                column: "IdPanel");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tareas");
        }
    }
}
