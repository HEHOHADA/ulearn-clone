using Microsoft.EntityFrameworkCore.Migrations;

namespace UlearnAPI.Migrations
{
    public partial class VideoHref : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VideoHref",
                table: "VideoTasks",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VideoHref",
                table: "VideoTasks");
        }
    }
}
