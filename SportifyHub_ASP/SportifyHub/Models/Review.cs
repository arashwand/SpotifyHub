using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportifyHub.Models
{
    public class Review
    {
        public int Id { get; set; } // Changed from string to int

        [Required]
        public string UserId { get; set; } = string.Empty; // Assuming ApplicationUser.Id is string

        [Required]
        [StringLength(100)]
        public string UserName { get; set; } = string.Empty; // Could be denormalized or fetched via UserId

        [Range(1, 5)]
        public int Rating { get; set; }

        [StringLength(1000)]
        public string Comment { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        // Foreign key for ApplicationUser (if ApplicationUser exists and is linked)
        // [ForeignKey("UserId")]
        // public ApplicationUser? User { get; set; } // Example if using ASP.NET Identity

        // Foreign keys for relationships - a review can belong to one of these
        public int? VenueId { get; set; }
        [ForeignKey("VenueId")]
        public Venue? Venue { get; set; }

        public int? FitnessClassId { get; set; } // Renamed from ClassItem
        [ForeignKey("FitnessClassId")]
        public FitnessClass? FitnessClass { get; set; }

        public int? CoachId { get; set; }
        [ForeignKey("CoachId")]
        public Coach? Coach { get; set; }
    }
}
