using SportifyHub.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services.Interfaces
{
    public interface IVenueService
    {
        Task<IEnumerable<Venue>> GetAllVenuesAsync();
        Task<Venue?> GetVenueByIdAsync(int id);
        Task CreateVenueAsync(Venue venue);
        Task UpdateVenueAsync(Venue venue);
        Task DeleteVenueAsync(int id);
        // Add other specific methods as needed, e.g., search, filter
        // Task<IEnumerable<Venue>> SearchVenuesAsync(string searchTerm, string city, SportCategory? sportType);
    }
}
