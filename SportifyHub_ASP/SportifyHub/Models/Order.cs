using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportifyHub.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } = string.Empty; // From ApplicationUser
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;

        public DateTime OrderDate { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalAmount { get; set; }

        public OrderStatus Status { get; set; }

        // Navigation property for OrderItems
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        // Shipping details (can be expanded)
        [StringLength(300)]
        public string? ShippingAddress { get; set; } // Could copy from User.Address or be specific
    }
}
