using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering; // For SelectList
using SportifyHub.Services.Interfaces;
using SportifyHub.Models; // For FitnessClass, Coach
using System; // For Enum, if used for SelectList
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic; // For List<Review>
using Microsoft.EntityFrameworkCore; // For DbUpdateConcurrencyException if uncommented
// using SportifyHub.ViewModels; // For potential FitnessClassViewModel

namespace SportifyHub.Controllers
{
    public class ClassesController : Controller // Or FitnessClassesController
    {
        private readonly IClassService _classService;
        private readonly ICoachService _coachService; // For populating instructor dropdown

        public ClassesController(IClassService classService, ICoachService coachService)
        {
            _classService = classService;
            _coachService = coachService;
        }

        // GET: Classes
        public async Task<IActionResult> Index()
        {
            var classes = await _classService.GetAllClassesAsync();
            return View(classes); // Assumes Views/Classes/Index.cshtml
        }

        // GET: Classes/Details/5
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0) return NotFound();
            var fitnessClass = await _classService.GetClassByIdAsync(id);
            if (fitnessClass == null) return NotFound();
            return View(fitnessClass); // Assumes Views/Classes/Details.cshtml
        }

        // GET: Classes/Create
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create()
        {
            var coaches = await _coachService.GetAllCoachesAsync();
            ViewBag.InstructorId = new SelectList(coaches, "Id", "Name");
            // ViewBag.SkillLevels = new SelectList(Enum.GetValues(typeof(SportifyHub.Models.SkillLevel))); // Corrected Enum usage
            // ViewBag.ClassSportCategories = new SelectList(Enum.GetValues(typeof(SportifyHub.Models.SportCategory))); // Corrected Enum usage
            return View(); // Assumes Views/Classes/Create.cshtml
        }

        // POST: Classes/Create
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,ClassSportCategory,Location,SkillLevel,InstructorId,Schedule,Price,Description,Image")] FitnessClass fitnessClass)
        {
            if (ModelState.IsValid)
            {
                fitnessClass.Reviews ??= new List<Review>();

                await _classService.CreateClassAsync(fitnessClass);
                return RedirectToAction(nameof(Index));
            }
            var coaches = await _coachService.GetAllCoachesAsync();
            ViewBag.InstructorId = new SelectList(coaches, "Id", "Name", fitnessClass.InstructorId);
            // ViewBag.SkillLevels = new SelectList(Enum.GetValues(typeof(SportifyHub.Models.SkillLevel)), fitnessClass.SkillLevel);
            // ViewBag.ClassSportCategories = new SelectList(Enum.GetValues(typeof(SportifyHub.Models.SportCategory)), fitnessClass.ClassSportCategory);
            return View(fitnessClass);
        }

        // GET: Classes/Edit/5
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Edit(int id)
        {
            if (id <= 0) return NotFound();
            var fitnessClass = await _classService.GetClassByIdAsync(id);
            if (fitnessClass == null) return NotFound();

            var coaches = await _coachService.GetAllCoachesAsync();
            ViewBag.InstructorId = new SelectList(coaches, "Id", "Name", fitnessClass.InstructorId);
            // ViewBag.SkillLevels = new SelectList(Enum.GetValues(typeof(SportifyHub.Models.SkillLevel)), fitnessClass.SkillLevel);
            // ViewBag.ClassSportCategories = new SelectList(Enum.GetValues(typeof(SportifyHub.Models.SportCategory)), fitnessClass.ClassSportCategory);
            return View(fitnessClass); // Assumes Views/Classes/Edit.cshtml
        }

        // POST: Classes/Edit/5
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,ClassSportCategory,Location,SkillLevel,InstructorId,Schedule,Price,Description,Image,Rating")] FitnessClass fitnessClass)
        {
            if (id != fitnessClass.Id) return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    await _classService.UpdateClassAsync(fitnessClass);
                }
                catch (DbUpdateConcurrencyException)
                {
                    // Placeholder for actual check:
                    // if (!await ClassExists(fitnessClass.Id)) return NotFound();
                    // else throw;
                    System.Console.WriteLine($"[ClassesController.Edit POST] Concurrency error for ID: {id} (Simulated)");
                }
                return RedirectToAction(nameof(Index));
            }
            var coaches = await _coachService.GetAllCoachesAsync();
            ViewBag.InstructorId = new SelectList(coaches, "Id", "Name", fitnessClass.InstructorId);
            // ViewBag.SkillLevels = new SelectList(Enum.GetValues(typeof(SportifyHub.Models.SkillLevel)), fitnessClass.SkillLevel);
            // ViewBag.ClassSportCategories = new SelectList(Enum.GetValues(typeof(SportifyHub.Models.SportCategory)), fitnessClass.ClassSportCategory);
            return View(fitnessClass);
        }

        // GET: Classes/Delete/5
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0) return NotFound();
            var fitnessClass = await _classService.GetClassByIdAsync(id);
            if (fitnessClass == null) return NotFound();
            return View(fitnessClass); // Assumes Views/Classes/Delete.cshtml
        }

        // POST: Classes/Delete/5
        // [Authorize(Roles = "Admin")]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (id <= 0) return NotFound();
            await _classService.DeleteClassAsync(id);
            return RedirectToAction(nameof(Index));
        }

        // private async Task<bool> ClassExists(int id)
        // {
        //     return (await _classService.GetClassByIdAsync(id)) != null;
        // }
    }
}
