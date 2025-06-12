using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization; // To protect actions
using Microsoft.AspNetCore.Identity; // For UserManager
using SportifyHub.Services.Interfaces;
using SportifyHub.Models; // For Booking, ApplicationUser, Venue, FitnessClass
// using SportifyHub.Models.Enums; // Enums are in SportifyHub.Models now
using System.Linq;
using System.Threading.Tasks;
using System;
// using SportifyHub.ViewModels; // For BookingViewModel

namespace SportifyHub.Controllers
{
    [Authorize] // All actions in this controller require login
    public class BookingsController : Controller
    {
        private readonly IBookingService _bookingService;
        private readonly IVenueService _venueService;
        private readonly IClassService _classService;
        private readonly UserManager<ApplicationUser> _userManager;

        public BookingsController(
            IBookingService bookingService,
            IVenueService venueService,
            IClassService classService,
            UserManager<ApplicationUser> userManager)
        {
            _bookingService = bookingService;
            _venueService = venueService;
            _classService = classService;
            _userManager = userManager;
        }

        // GET: Bookings (or Bookings/Index - lists current user's bookings)
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();

            var bookings = await _bookingService.GetBookingsByUserIdAsync(user.Id);
            return View(bookings); // Assumes Views/Bookings/Index.cshtml
        }

        // GET: Bookings/Details/5
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0) return NotFound();
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null) return NotFound();

            var user = await _userManager.GetUserAsync(User);
            // bool isAdmin = User.IsInRole("Admin"); // Example if admin role exists
            if (user == null || (booking.UserId != user.Id /* && !isAdmin */) )
            {
                return Forbid();
            }

            // if (booking.Type == BookingType.Venue) { ViewBag.ItemDetails = await _venueService.GetVenueByIdAsync(booking.ItemId); }
            // else if (booking.Type == BookingType.Class) { ViewBag.ItemDetails = await _classService.GetClassByIdAsync(booking.ItemId); }

            return View(booking); // Assumes Views/Bookings/Details.cshtml
        }

        // GET: Bookings/CreateForVenue?venueId=5
        public async Task<IActionResult> CreateForVenue(int venueId)
        {
            if (venueId <= 0) return NotFound();
            var venue = await _venueService.GetVenueByIdAsync(venueId);
            if (venue == null) return NotFound();

            var bookingModel = new Booking
            {
                ItemId = venue.Id,
                ItemName = venue.Name,
                Type = BookingType.Venue,
                Price = venue.PricePerHour
            };
            ViewBag.ItemName = venue.Name;
            ViewBag.ItemType = "Venue";
            // Example: Populate available slots. This is complex and depends on business logic.
            // ViewBag.AvailableSlots = new SelectList(new List<string> { "10:00-11:00", "11:00-12:00" }); // Placeholder
            return View("Create", bookingModel); // Assumes Views/Bookings/Create.cshtml
        }

        // GET: Bookings/CreateForClass?classId=5
        public async Task<IActionResult> CreateForClass(int classId)
        {
            if (classId <= 0) return NotFound();
            var fitnessClass = await _classService.GetClassByIdAsync(classId);
            if (fitnessClass == null) return NotFound();

            var bookingModel = new Booking
            {
                ItemId = fitnessClass.Id,
                ItemName = fitnessClass.Name,
                Type = BookingType.Class,
                Price = fitnessClass.Price
            };
            ViewBag.ItemName = fitnessClass.Name;
            ViewBag.ItemType = "Class";
            // For classes, the TimeSlot might be part of the class's schedule property
            // Or if a class has multiple sessions, user might select one.
            // ViewBag.TimeSlot = fitnessClass.Schedule; // Example
            return View("Create", bookingModel); // Assumes Views/Bookings/Create.cshtml
        }

        // POST: Bookings/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ItemId,ItemName,Type,BookingDate,TimeSlot,Price")] Booking booking)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();
            booking.UserId = user.Id;
            booking.Status = BookingStatus.Pending;

            if (booking.Type == BookingType.Venue) {
                var venue = await _venueService.GetVenueByIdAsync(booking.ItemId);
                if (venue == null) ModelState.AddModelError("", "Selected venue not found.");
                else { booking.ItemName = venue.Name; booking.Price = venue.PricePerHour; }
            } else if (booking.Type == BookingType.Class) {
                var fitnessClass = await _classService.GetClassByIdAsync(booking.ItemId);
                if (fitnessClass == null) ModelState.AddModelError("", "Selected class not found.");
                else { booking.ItemName = fitnessClass.Name; booking.Price = fitnessClass.Price; }
            } else {
                ModelState.AddModelError("Type", "Invalid booking type.");
            }

            if (ModelState.IsValid)
            {
                // TODO: Availability check via _bookingService.IsSlotAvailable(...)
                if (ModelState.IsValid)
                {
                    var result = await _bookingService.CreateBookingAsync(booking);
                    if (result.Success && result.CreatedBooking != null)
                    {
                        // Optionally, pass the created booking ID to a confirmation page
                        // return RedirectToAction(nameof(BookingConfirmation), new { id = result.CreatedBooking.Id });
                        TempData["SuccessMessage"] = $"Booking for {result.CreatedBooking.ItemName} confirmed!";
                        return RedirectToAction(nameof(Index));
                    }
                    ModelState.AddModelError("", result.ErrorMessage ?? "Could not create booking.");
                }
            }

            ViewBag.ItemName = booking.ItemName; // Repopulate for form
            ViewBag.ItemType = booking.Type.ToString();
            // Repopulate available slots if needed for the form upon error
            return View(booking);
        }

        // POST: Bookings/Cancel/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Cancel(int id)
        {
            if (id <= 0) return NotFound();
            var booking = await _bookingService.GetBookingByIdAsync(id);
            var user = await _userManager.GetUserAsync(User);

            if (booking == null || user == null || booking.UserId != user.Id)
            {
                TempData["ErrorMessage"] = "Booking not found or permission denied.";
                return RedirectToAction(nameof(Index));
            }

            if (booking.Status == BookingStatus.Confirmed || booking.Status == BookingStatus.Pending)
            {
                // TODO: Add business logic for cancellation window (e.g., not allowed X hours before event)
                bool success = await _bookingService.UpdateBookingStatusAsync(id, BookingStatus.Cancelled);
                if (success) TempData["SuccessMessage"] = "Booking cancelled successfully.";
                else TempData["ErrorMessage"] = "Could not cancel booking.";
            }
            else
            {
                TempData["InfoMessage"] = "This booking cannot be cancelled.";
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
