using System.ComponentModel.DataAnnotations;

namespace SportifyHub.Models
{
    public class Amenity
    {
        public int Id { get; set; } // Changed from string to int for typical DB primary key

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        // Icon can be stored as a CSS class string or path to an image/SVG if needed.
        // For simplicity, we'll omit direct React.ReactNode equivalent here.
        // public string? IconCssClass { get; set; }

        // Navigation property for many-to-many relationship with Venue
        public ICollection<VenueAmenity> VenueAmenities { get; set; } = new List<VenueAmenity>();
    }
}
