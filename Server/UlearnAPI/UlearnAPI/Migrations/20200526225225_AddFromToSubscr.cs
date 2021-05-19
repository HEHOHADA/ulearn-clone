using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UlearnAPI.Migrations
{
    public partial class AddFromToSubscr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BoughtDate",
                table: "Subscriptions",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BoughtDate",
                table: "Subscriptions");
        }
    }
}
