using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportifyHub.Models
{
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } = string.Empty; // From ApplicationUser
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;

        public BookingType Type { get; set; }

        public int ItemId { get; set; } // Refers to VenueId or FitnessClassId based on Type

        [Required]
        [StringLength(200)]
        public string ItemName { get; set; } = string.Empty; // Denormalized for convenience

        public DateTime BookingDate { get; set; } // Represents the primary date of the booking

        [StringLength(100)]
        public string? TimeSlot { get; set; } // e.g., "10:00-12:00"

        public BookingStatus Status { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        // For recurring bookings
        public RecurrenceType? Recurrence { get; set; } // Renamed from RecurrenceType to avoid conflict with enum name
        public int? NumberOfSessions { get; set; }

        // For specific booked slots in recurring bookings, if needed.
        // This could be a JSON string or a separate related table "BookedSlot"
        // public string BookedSlotsJson { get; set; } = string.Empty; // e.g., "[{"date": "2024-07-01", "timeSlot": "10-12"}, ...]"
        // For now, keeping it simple. Detailed slots might be complex.

        // Navigation properties to Venue or FitnessClass (optional, if strict typing is needed here beyond ItemId)
        // These would require careful handling in logic based on 'Type'
        // public Venue? Venue { get; set; }
        // public FitnessClass? FitnessClass { get; set; }
    }
}
