using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering; // For SelectList if needed for specialties
using SportifyHub.Services.Interfaces;
using SportifyHub.Models; // For Coach model
// using SportifyHub.Models.Enums; // Enums are in SportifyHub.Models now
using System; // For Enum
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json; // For handling QualificationsJson, Specialties
using System.Collections.Generic; // For List
using Microsoft.EntityFrameworkCore; // For DbUpdateConcurrencyException if uncommented


namespace SportifyHub.Controllers
{
    public class CoachesController : Controller
    {
        private readonly ICoachService _coachService;

        public CoachesController(ICoachService coachService)
        {
            _coachService = coachService;
        }

        // GET: Coaches
        public async Task<IActionResult> Index()
        {
            var coaches = await _coachService.GetAllCoachesAsync();
            return View(coaches); // Assumes Views/Coaches/Index.cshtml
        }

        // GET: Coaches/Details/5
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0) return NotFound();
            var coach = await _coachService.GetCoachByIdAsync(id);
            if (coach == null) return NotFound();

            try
            {
                ViewBag.QualificationsList = !string.IsNullOrEmpty(coach.QualificationsJson)
                    ? JsonSerializer.Deserialize<List<string>>(coach.QualificationsJson)
                    : new List<string>();
            }
            catch (JsonException)
            {
                ViewBag.QualificationsList = new List<string> { "Error parsing qualifications" };
            }
            // CoachSpecialties are expected to be eager loaded by the service if needed for display
            // For example, to display them:
            // ViewBag.SpecialtiesDisplay = coach.CoachSpecialties?.Select(cs => cs.Specialty.ToString()).ToList() ?? new List<string>();

            return View(coach); // Assumes Views/Coaches/Details.cshtml
        }

        // GET: Coaches/Create
        // [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            ViewBag.AllSpecialties = Enum.GetValues(typeof(SportCategory))
                                         .Cast<SportCategory>()
                                         .Select(e => new SelectListItem { Value = e.ToString(), Text = e.ToString() })
                                         .ToList();
            return View(new Coach { QualificationsJson = "[]", CoachSpecialties = new List<CoachSpecialty>() });
        }

        // POST: Coaches/Create
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,Location,Bio,QualificationsJson,PhotoUrl,ContactInfo,ExperienceYears")] Coach coach, List<SportCategory> selectedSpecialties)
        {
            if (ModelState.IsValid)
            {
                coach.Reviews ??= new List<Review>();
                coach.FitnessClasses ??= new List<FitnessClass>();
                coach.CoachSpecialties = selectedSpecialties?.Select(spec => new CoachSpecialty { Specialty = spec /* CoachId will be set by EF if coach is new */ }).ToList() ?? new List<CoachSpecialty>();

                if (string.IsNullOrWhiteSpace(coach.QualificationsJson)) coach.QualificationsJson = "[]";

                await _coachService.CreateCoachAsync(coach);
                return RedirectToAction(nameof(Index));
            }
            ViewBag.AllSpecialties = Enum.GetValues(typeof(SportCategory))
                                         .Cast<SportCategory>()
                                         .Select(e => new SelectListItem { Value = e.ToString(), Text = e.ToString() })
                                         .ToList();
            return View(coach);
        }

        // GET: Coaches/Edit/5
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Edit(int id)
        {
            if (id <= 0) return NotFound();
            var coach = await _coachService.GetCoachByIdAsync(id);
            if (coach == null) return NotFound();

            ViewBag.AllSpecialties = Enum.GetValues(typeof(SportCategory))
                                         .Cast<SportCategory>()
                                         .Select(e => new SelectListItem {
                                             Value = e.ToString(),
                                             Text = e.ToString(),
                                             Selected = coach.CoachSpecialties?.Any(cs => cs.Specialty == e) ?? false
                                         }).ToList();
            if (string.IsNullOrWhiteSpace(coach.QualificationsJson)) coach.QualificationsJson = "[]";
            return View(coach);
        }

        // POST: Coaches/Edit/5
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Location,Bio,QualificationsJson,PhotoUrl,ContactInfo,ExperienceYears,Rating")] Coach coach, List<SportCategory> selectedSpecialties)
        {
            if (id != coach.Id) return NotFound();

            if (ModelState.IsValid)
            {
                // The service's UpdateCoachAsync should ideally handle the update of related entities
                // like CoachSpecialties. Passing selectedSpecialties to the service might be a cleaner approach.
                // For this controller, we reconstruct the CoachSpecialties based on selection.
                // This requires the service to know how to merge/replace these.
                var existingCoach = await _coachService.GetCoachByIdAsync(id); // Required to manage related entities
                if (existingCoach == null) return NotFound();

                // Update properties of existingCoach from the bound coach model
                existingCoach.Name = coach.Name;
                existingCoach.Location = coach.Location;
                existingCoach.Bio = coach.Bio;
                existingCoach.QualificationsJson = string.IsNullOrWhiteSpace(coach.QualificationsJson) ? "[]" : coach.QualificationsJson;
                existingCoach.PhotoUrl = coach.PhotoUrl;
                existingCoach.ContactInfo = coach.ContactInfo;
                existingCoach.ExperienceYears = coach.ExperienceYears;
                existingCoach.Rating = coach.Rating; // Assuming Rating is directly editable

                // Update specialties - this is a common pattern for many-to-many
                existingCoach.CoachSpecialties = selectedSpecialties?.Select(spec => new CoachSpecialty { CoachId = existingCoach.Id, Specialty = spec }).ToList() ?? new List<CoachSpecialty>();

                try
                {
                    await _coachService.UpdateCoachAsync(existingCoach);
                }
                catch (DbUpdateConcurrencyException)
                {
                    System.Console.WriteLine($"[CoachesController.Edit POST] Concurrency error for ID: {id} (Simulated)");
                    // if (!await CoachExists(coach.Id)) return NotFound(); else throw;
                }
                return RedirectToAction(nameof(Index));
            }
            ViewBag.AllSpecialties = Enum.GetValues(typeof(SportCategory))
                                         .Cast<SportCategory>()
                                         .Select(e => new SelectListItem {
                                             Value = e.ToString(),
                                             Text = e.ToString(),
                                             Selected = selectedSpecialties?.Contains(e) ?? false
                                         }).ToList();
            return View(coach);
        }

        // GET: Coaches/Delete/5
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0) return NotFound();
            var coach = await _coachService.GetCoachByIdAsync(id);
            if (coach == null) return NotFound();
            return View(coach);
        }

        // POST: Coaches/Delete/5
        // [Authorize(Roles = "Admin")]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (id <= 0) return NotFound();
            await _coachService.DeleteCoachAsync(id);
            return RedirectToAction(nameof(Index));
        }

        // private async Task<bool> CoachExists(int id)
        // {
        //     return (await _coachService.GetCoachByIdAsync(id)) != null;
        // }
    }
}
