using Microsoft.EntityFrameworkCore.Migrations;

namespace UlearnAPI.Migrations
{
    public partial class testtaskfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "CodeTaskResults",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "CodeTaskResults",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TestTaskResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Points = table.Column<int>(type: "INTEGER", nullable: false),
                    TaskId = table.Column<int>(type: "INTEGER", nullable: true),
                    SenderId = table.Column<string>(type: "TEXT", nullable: true),
                    GroupId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestTaskResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestTaskResults_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestTaskResults_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestTaskResults_TestTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "TestTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestTaskResults_GroupId",
                table: "TestTaskResults",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TestTaskResults_SenderId",
                table: "TestTaskResults",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_TestTaskResults_TaskId",
                table: "TestTaskResults",
                column: "TaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestTaskResults");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "CodeTaskResults");

            migrationBuilder.DropColumn(
                name: "Points",
                table: "CodeTaskResults");
        }
    }
}
