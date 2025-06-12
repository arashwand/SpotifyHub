using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SportifyHub.Models; // Contains ApplicationUser and other models
// using SportifyHub.Models.Enums; // Enums are now in SportifyHub.Models namespace directly with file-scoped namespaces or if Enums folder is directly under Models

namespace SportifyHub.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Add DbSets for all your models here
        public DbSet<Amenity> Amenities { get; set; } = null!;
        public DbSet<Article> Articles { get; set; } = null!;
        public DbSet<Booking> Bookings { get; set; } = null!;
        public DbSet<Coach> Coaches { get; set; } = null!;
        public DbSet<CoachSpecialty> CoachSpecialties { get; set; } = null!;
        public DbSet<FitnessClass> FitnessClasses { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<Review> Reviews { get; set; } = null!;
        public DbSet<Venue> Venues { get; set; } = null!;
        public DbSet<VenueAmenity> VenueAmenities { get; set; } = null!;
        // ApplicationUser is handled by IdentityDbContext

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // Important for Identity

            // Configure composite primary keys for join tables
            builder.Entity<VenueAmenity>()
                .HasKey(va => new { va.VenueId, va.AmenityId });

            builder.Entity<CoachSpecialty>()
                .HasKey(cs => new { cs.CoachId, cs.Specialty });

            // Configure relationships for join tables (Fluent API)
            // VenueAmenity (Many-to-Many between Venue and Amenity)
            builder.Entity<VenueAmenity>()
                .HasOne(va => va.Venue)
                .WithMany(v => v.VenueAmenities)
                .HasForeignKey(va => va.VenueId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<VenueAmenity>()
                .HasOne(va => va.Amenity)
                .WithMany(a => a.VenueAmenities)
                .HasForeignKey(va => va.AmenityId)
                .OnDelete(DeleteBehavior.Cascade);

            // CoachSpecialty (Many-to-Many between Coach and SportCategory Enum)
            builder.Entity<CoachSpecialty>()
                .HasOne(cs => cs.Coach)
                .WithMany(c => c.CoachSpecialties)
                .HasForeignKey(cs => cs.CoachId)
                .OnDelete(DeleteBehavior.Cascade);

            // OrderItem (Many-to-Many between Order and Product)
            builder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

            builder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(oi => oi.ProductId);

            // Configure decimal precision for currency properties
            builder.Entity<Venue>().Property(v => v.PricePerHour).HasPrecision(18, 2);
            builder.Entity<FitnessClass>().Property(fc => fc.Price).HasPrecision(18, 2);
            builder.Entity<Product>().Property(p => p.Price).HasPrecision(18, 2);
            builder.Entity<Booking>().Property(b => b.Price).HasPrecision(18, 2);
            builder.Entity<Order>().Property(o => o.TotalAmount).HasPrecision(18, 2);
            builder.Entity<OrderItem>().Property(oi => oi.UnitPrice).HasPrecision(18, 2);

            // Relationships for Review (one-to-many with Venue, FitnessClass, Coach)
            builder.Entity<Review>()
                .HasOne(r => r.Venue)
                .WithMany(v => v.Reviews)
                .HasForeignKey(r => r.VenueId)
                .IsRequired(false) // Explicitly state that VenueId is optional
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<Review>()
                .HasOne(r => r.FitnessClass)
                .WithMany(fc => fc.Reviews)
                .HasForeignKey(r => r.FitnessClassId)
                .IsRequired(false) // Explicitly state that FitnessClassId is optional
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<Review>()
                .HasOne(r => r.Coach)
                .WithMany(c => c.Reviews)
                .HasForeignKey(r => r.CoachId)
                .IsRequired(false) // Explicitly state that CoachId is optional
                .OnDelete(DeleteBehavior.ClientSetNull);

            // Note on JSON properties (e.g., Venue.Images, Venue.AvailableTimeSlotsJson):
            // EF Core can map these to string columns by default.
            // For querying or more complex scenarios, consider Value Converters or Owned Entity Types.
            // This basic setup assumes they are treated as plain strings in the database for now.
        }
    }
}
