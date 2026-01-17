using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class introduceitemgrouplines : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ItemGroupLines",
                columns: table => new
                {
                    ItemGroupLineId = table.Column<Guid>(type: "uuid", nullable: false),
                    ItemGroup_id = table.Column<Guid>(type: "uuid", nullable: false),
                    OriginalItemId = table.Column<Guid>(type: "uuid", nullable: false),
                    ItemName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    ItemDescription = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    Quantity = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemGroupLines", x => x.ItemGroupLineId);
                    table.ForeignKey(
                        name: "FK_ItemGroupLines_ItemGroups_ItemGroup_id",
                        column: x => x.ItemGroup_id,
                        principalTable: "ItemGroups",
                        principalColumn: "ItemGroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemGroupLines_ItemGroup_id",
                table: "ItemGroupLines",
                column: "ItemGroup_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemGroupLines");
        }
    }
}
