using SportifyHub.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<Booking>> GetAllBookingsAsync(); // Potentially admin only
        Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(string userId);
        Task<Booking?> GetBookingByIdAsync(int id);
        Task<BookingResult> CreateBookingAsync(Booking booking); // BookingResult might indicate success/failure/specific errors
        Task<bool> UpdateBookingStatusAsync(int bookingId, BookingStatus newStatus, string? adminUserId = null); // For user cancellation or admin updates
        // Task<bool> CancelBookingAsync(int bookingId, string userId); // User cancels their own booking
    }

    // Helper record for CreateBookingAsync result
    public record BookingResult(bool Success, string? ErrorMessage = null, Booking? CreatedBooking = null);
}
