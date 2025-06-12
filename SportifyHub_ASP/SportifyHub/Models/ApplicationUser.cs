using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SportifyHub.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        [StringLength(100)]
        public string? Name { get; set; } // From UserProfile in types.ts

        [PersonalData]
        [StringLength(500)]
        public string? ProfilePictureUrl { get; set; } // From UserProfile

        [PersonalData]
        [StringLength(300)]
        public string? Address { get; set; } // From UserProfile

        // Navigation properties
        // Reviews written by the user (if linking Review.UserId to ApplicationUser.Id)
        // public ICollection<Review> Reviews { get; set; } = new List<Review>();

        // Bookings made by the user
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();

        // Orders placed by the user
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
