using Microsoft.EntityFrameworkCore.Migrations;

namespace UlearnAPI.Migrations
{
    public partial class codetaskinitialcode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InitialCode",
                table: "CodeTasks",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialCode",
                table: "CodeTasks");
        }
    }
}
