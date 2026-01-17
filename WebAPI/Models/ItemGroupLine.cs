using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class ItemGroupLine
    {
        [Key]
        public Guid ItemGroupLineId { get; set; } = Guid.NewGuid();

        [Required]
        public Guid ItemGroup_id { get; set; }

        [ForeignKey(nameof(ItemGroup_id))]
        [JsonIgnore]
        public virtual ItemGroup ItemGroup { get; set; }

        [Required]
        public Guid OriginalItemId { get; set; }

        [Required]
        [StringLength(256)]
        public string ItemName { get; set; }

        [StringLength(1024)]
        public string? ItemDescription { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Quantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
    }
}
