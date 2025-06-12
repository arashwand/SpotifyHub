using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
// Assuming Models namespace will be SportifyHub.Models
// using SportifyHub.Models;

namespace SportifyHub.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    // ErrorViewModel would typically be in Models folder, e.g., SportifyHub.Models.ErrorViewModel
    // For now, let's define a placeholder if needed or assume it's created later.
    // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    // public IActionResult Error()
    // {
    //     return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    // }
}
