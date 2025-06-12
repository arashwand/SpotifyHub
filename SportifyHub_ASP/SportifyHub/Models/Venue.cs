using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportifyHub.Models
{
    public class Venue
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        public SportCategory SportType { get; set; }

        [Required]
        [StringLength(300)]
        public string Location { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string City { get; set; } = string.Empty;

        // Store images as a collection of strings (URLs or paths)
        // For simplicity, EF Core can store this as a JSON string in DB if configured, or use a separate Image table.
        // Let's assume a simple approach first, potentially just one primary image or a delimited string.
        // For a more robust solution, an Image table related to Venue would be better.
        public ICollection<string> Images { get; set; } = new List<string>(); // Or public string MainImageUrl {get; set;}

        [Url]
        [StringLength(500)]
        public string? MapLink { get; set; }

        // availableTimeSlots: { [dayOfWeek: string]: string[]; }
        // This is complex for a direct DB mapping.
        // Option 1: Store as JSON string and handle in application logic.
        // Option 2: Create a separate related table e.g., VenueAvailability(VenueId, DayOfWeek, TimeSlotJsonArray)
        // Let's go with JSON string for now for simplicity, can be normalized later.
        public string AvailableTimeSlotsJson { get; set; } = string.Empty; // e.g., "{ "شنبه": ["10-12", "14-16"] }"

        [Column(TypeName = "decimal(18, 2)")]
        public decimal PricePerHour { get; set; }

        [Range(0, 5)]
        public double Rating { get; set; } // Or decimal

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        // Navigation properties
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<VenueAmenity> VenueAmenities { get; set; } = new List<VenueAmenity>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
