using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportifyHub.Models
{
    public class Coach
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        // Specialties: (SportCategory | string)[]
        // Storing as a collection of enums. A join table (CoachSpecialty) would be more normalized.
        // For simplicity, could be a JSON string or comma-separated string if not querying on individual specialties often.
        // Let's use a join table approach for better querying.
        public ICollection<CoachSpecialty> CoachSpecialties { get; set; } = new List<CoachSpecialty>();


        [Required]
        [StringLength(100)]
        public string Location { get; set; } = string.Empty; // Or link to a City model

        [Range(0, 5)]
        public double Rating { get; set; }

        [StringLength(4000)]
        public string Bio { get; set; } = string.Empty;

        // Qualifications: string[]
        // Store as JSON string or use a related table CoachQualification(CoachId, QualificationText)
        public string QualificationsJson { get; set; } = string.Empty; // e.g. "["Cert1", "Cert2"]"

        [Url]
        [StringLength(500)]
        public string? PhotoUrl { get; set; }

        [StringLength(200)]
        public string? ContactInfo { get; set; } // Could be phone or email

        public int ExperienceYears { get; set; }

        // Navigation properties
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<FitnessClass> FitnessClasses { get; set; } = new List<FitnessClass>(); // Classes taught by this coach
    }

    public class CoachSpecialty
    {
        public int CoachId { get; set; }
        [ForeignKey("CoachId")]
        public Coach Coach { get; set; } = null!;

        public SportCategory Specialty { get; set; }
        // If custom string specialties are also needed:
        // public string? CustomSpecialty {get; set;}
    }
}
