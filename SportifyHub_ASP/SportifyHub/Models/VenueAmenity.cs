using System.ComponentModel.DataAnnotations.Schema;

namespace SportifyHub.Models
{
    // Join table for Venue and Amenity (Many-to-Many)
    public class VenueAmenity
    {
        public int VenueId { get; set; }
        [ForeignKey("VenueId")]
        public Venue Venue { get; set; } = null!;

        public int AmenityId { get; set; }
        [ForeignKey("AmenityId")]
        public Amenity Amenity { get; set; } = null!;
    }
}
