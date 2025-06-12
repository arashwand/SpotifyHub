using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportifyHub.Models
{
    public class FitnessClass // Renamed from ClassItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        // Using SportCategory enum, but allowing for string if it's more flexible from original 'SportCategory | string'
        public SportCategory ClassSportCategory { get; set; }
        // public string? CustomClassType { get; set; } // If SportCategory doesn't fit

        [Required]
        [StringLength(300)]
        public string Location { get; set; } = string.Empty;

        public SkillLevel SkillLevel { get; set; }

        // Link to Coach model
        public int? InstructorId { get; set; } // Foreign Key
        [ForeignKey("InstructorId")]
        public Coach? Instructor { get; set; }

        // InstructorName can be denormalized or fetched via Instructor relationship
        [NotMapped] // Or remove if always fetching from Instructor.Name
        public string InstructorName => Instructor?.Name ?? string.Empty; // Requires Coach model to be defined first for Name property


        [Required]
        [StringLength(200)]
        public string Schedule { get; set; } = string.Empty; // e.g., "یکشنبه و سه‌شنبه ۱۷:۰۰-۱۸:۳۰" - Consider parsing or structured storage later

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; } // Assuming this is per session or course

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        [Url]
        [StringLength(500)]
        public string? Image { get; set; } // URL to image

        [Range(0, 5)]
        public double Rating { get; set; }

        // Navigation properties
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        // Potentially UsersEnrolled if tracking individual user enrollment beyond bookings
    }
}
