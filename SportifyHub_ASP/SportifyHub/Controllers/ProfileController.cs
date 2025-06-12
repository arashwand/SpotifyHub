using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using SportifyHub.Models;
using System.Threading.Tasks;

namespace SportifyHub.Controllers
{
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: Profile/Index
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                // This case should ideally not be reached if [Authorize] is effective
                // and the user is authenticated.
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }
            // You might map to a specific ProfileViewModel here if needed
            return View(user); // Passes ApplicationUser model to Views/Profile/Index.cshtml
        }
    }
}
