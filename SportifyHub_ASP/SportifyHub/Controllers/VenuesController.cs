using Microsoft.AspNetCore.Mvc;
using SportifyHub.Services.Interfaces;
using SportifyHub.Models; // For Venue model
using System.Threading.Tasks;
using System.Collections.Generic; // For List<string> etc.
using System.Linq; // For SelectMany if logging ModelState errors
using Microsoft.EntityFrameworkCore; // For DbUpdateConcurrencyException if uncommented

// using SportifyHub.ViewModels; // Will be needed later

namespace SportifyHub.Controllers
{
    public class VenuesController : Controller
    {
        private readonly IVenueService _venueService;
        // private readonly ILogger<VenuesController> _logger; // Optional for logging

        public VenuesController(IVenueService venueService /*, ILogger<VenuesController> logger */)
        {
            _venueService = venueService;
            // _logger = logger;
        }

        // GET: Venues
        public async Task<IActionResult> Index()
        {
            // _logger.LogInformation("VenuesController Index action called.");
            var venues = await _venueService.GetAllVenuesAsync();
            return View(venues); // Assumes a Views/Venues/Index.cshtml exists
        }

        // GET: Venues/Details/5
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }
            var venue = await _venueService.GetVenueByIdAsync(id);
            if (venue == null)
            {
                // _logger.LogWarning($"Venue with ID {id} not found.");
                return NotFound();
            }
            return View(venue); // Assumes a Views/Venues/Details.cshtml exists
        }

        // GET: Venues/Create
        public IActionResult Create()
        {
            return View(); // Assumes a Views/Venues/Create.cshtml exists
        }

        // POST: Venues/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,SportType,Location,City,Images,MapLink,AvailableTimeSlotsJson,PricePerHour,Description")] Venue venue)
        {
            if (ModelState.IsValid)
            {
                venue.Images ??= new List<string>();
                venue.Reviews ??= new List<Review>(); // Initialize navigation properties if null
                venue.VenueAmenities ??= new List<VenueAmenity>();

                await _venueService.CreateVenueAsync(venue);
                // _logger.LogInformation($"Venue '{venue.Name}' created successfully.");
                return RedirectToAction(nameof(Index));
            }
            // _logger.LogWarning("VenuesController Create POST: ModelState is invalid.");
            // foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            // {
            //     _logger.LogWarning($"ModelState Error: {error.ErrorMessage}");
            // }
            return View(venue);
        }

        // GET: Venues/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }
            var venue = await _venueService.GetVenueByIdAsync(id);
            if (venue == null)
            {
                // _logger.LogWarning($"Venue with ID {id} not found for edit.");
                return NotFound();
            }
            return View(venue); // Assumes a Views/Venues/Edit.cshtml exists
        }

        // POST: Venues/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,SportType,Location,City,Images,MapLink,AvailableTimeSlotsJson,PricePerHour,Rating,Description")] Venue venue)
        {
            if (id != venue.Id)
            {
                // _logger.LogWarning($"Venue ID mismatch in Edit POST. Path ID: {id}, Model ID: {venue.Id}");
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // venue.Images ??= new List<string>(); // Not typically needed if binding existing entity
                    await _venueService.UpdateVenueAsync(venue);
                    // _logger.LogInformation($"Venue '{venue.Name}' (ID: {id}) updated successfully.");
                }
                catch (DbUpdateConcurrencyException)
                {
                    // Placeholder for actual check:
                    // if (!await VenueExists(venue.Id))
                    // {
                    //     return NotFound();
                    // }
                    // else
                    // {
                    //     throw;
                    // }
                    System.Console.WriteLine($"[VenuesController.Edit POST] A concurrency error might have occurred for ID: {id} - (Simulated)");
                    // Consider adding a model error and returning to view.
                }
                return RedirectToAction(nameof(Index));
            }
            // _logger.LogWarning($"VenuesController Edit POST: ModelState is invalid for venue ID {id}.");
            return View(venue);
        }

        // GET: Venues/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }
            var venue = await _venueService.GetVenueByIdAsync(id);
            if (venue == null)
            {
                // _logger.LogWarning($"Venue with ID {id} not found for delete confirmation.");
                return NotFound();
            }
            return View(venue); // Assumes a Views/Venues/Delete.cshtml exists
        }

        // POST: Venues/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (id <= 0)
            {
                // _logger.LogWarning($"VenuesController DeleteConfirmed POST: Invalid ID {id}.");
                return NotFound();
            }
            await _venueService.DeleteVenueAsync(id);
            // _logger.LogInformation($"Venue with ID {id} deleted successfully.");
            return RedirectToAction(nameof(Index));
        }

        // Private helper method (example)
        // private async Task<bool> VenueExists(int id)
        // {
        //     return (await _venueService.GetVenueByIdAsync(id)) != null;
        // }
    }
}
