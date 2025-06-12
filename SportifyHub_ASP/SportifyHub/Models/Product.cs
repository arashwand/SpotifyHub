using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportifyHub.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Category { get; set; } = string.Empty; // Could be an enum or a separate Category model

        // Store images as a collection of strings (URLs or paths)
        public ICollection<string> Images { get; set; } = new List<string>(); // Or MainImageUrl + AdditionalImageUrlsJson

        [StringLength(4000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        [Required]
        public int Stock { get; set; }

        [Range(0, 5)]
        public double? Rating { get; set; } // Nullable if not all products are rated

        // Navigation property for OrderItems (many-to-many relationship with Order via OrderItem)
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
