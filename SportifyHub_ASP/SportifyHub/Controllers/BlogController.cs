using Microsoft.AspNetCore.Mvc;
using SportifyHub.Services.Interfaces;
using SportifyHub.Models; // For Article model
using System.Threading.Tasks;
using System.Text.Json; // For TagsJson if needed for display
using System.Collections.Generic; // For List<string> for tags
using Microsoft.EntityFrameworkCore; // For DbUpdateConcurrencyException if uncommented


namespace SportifyHub.Controllers
{
    public class BlogController : Controller
    {
        private readonly IArticleService _articleService;

        public BlogController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        // GET: Blog or Blog/Index (Public view of articles)
        public async Task<IActionResult> Index()
        {
            var articles = await _articleService.GetAllArticlesAsync();
            return View(articles); // Assumes Views/Blog/Index.cshtml
        }

        // GET: Blog/Details/5
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0) return NotFound();
            var article = await _articleService.GetArticleByIdAsync(id);
            if (article == null) return NotFound();

            try
            {
                ViewBag.TagsList = !string.IsNullOrEmpty(article.TagsJson)
                    ? JsonSerializer.Deserialize<List<string>>(article.TagsJson) ?? new List<string>()
                    : new List<string>();
            }
            catch (JsonException)
            {
                ViewBag.TagsList = new List<string> { "Error parsing tags" };
            }

            return View(article); // Assumes Views/Blog/Details.cshtml
        }

        // --- Admin-focused CRUD operations ---

        // GET: Blog/Manage (Admin: List articles for management)
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Manage()
        {
            var articles = await _articleService.GetAllArticlesAsync();
            return View("ManageArticles", articles); // Assumes Views/Blog/ManageArticles.cshtml
        }

        // GET: Blog/Create (Admin)
        // [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            return View("CreateArticle", new Article { Date = System.DateTime.Now, TagsJson = "[]" });
        }

        // POST: Blog/Create (Admin)
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateArticle([Bind("Title,Category,Author,Date,Summary,Content,ImageUrl,TagsJson")] Article article)
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(article.TagsJson)) article.TagsJson = "[]";
                try
                {
                    JsonSerializer.Deserialize<List<string>>(article.TagsJson);
                }
                catch (JsonException)
                {
                    ModelState.AddModelError("TagsJson", "Tags must be a valid JSON array of strings (e.g., [\"tag1\", \"tag2\"]).");
                }

                if (ModelState.IsValid)
                {
                    await _articleService.CreateArticleAsync(article);
                    return RedirectToAction(nameof(Manage));
                }
            }
            return View("CreateArticle", article);
        }

        // GET: Blog/Edit/5 (Admin)
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Edit(int id)
        {
            if (id <= 0) return NotFound();
            var article = await _articleService.GetArticleByIdAsync(id);
            if (article == null) return NotFound();
            if (string.IsNullOrWhiteSpace(article.TagsJson)) article.TagsJson = "[]";
            return View("EditArticle", article);
        }

        // POST: Blog/Edit/5 (Admin)
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditArticle(int id, [Bind("Id,Title,Category,Author,Date,Summary,Content,ImageUrl,TagsJson")] Article article)
        {
            if (id != article.Id) return NotFound();

            if (ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(article.TagsJson)) article.TagsJson = "[]";
                try
                {
                    JsonSerializer.Deserialize<List<string>>(article.TagsJson);
                }
                catch (JsonException)
                {
                    ModelState.AddModelError("TagsJson", "Tags must be a valid JSON array of strings (e.g., [\"tag1\", \"tag2\"]).");
                }

                if (ModelState.IsValid)
                {
                    try
                    {
                        await _articleService.UpdateArticleAsync(article);
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        System.Console.WriteLine($"[BlogController.EditArticle POST] Concurrency error for ID: {id} (Simulated)");
                        // if (!await ArticleExists(article.Id)) return NotFound(); else throw;
                    }
                    return RedirectToAction(nameof(Manage));
                }
            }
            return View("EditArticle", article);
        }

        // GET: Blog/Delete/5 (Admin)
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0) return NotFound();
            var article = await _articleService.GetArticleByIdAsync(id);
            if (article == null) return NotFound();
            return View("DeleteArticle", article);
        }

        // POST: Blog/Delete/5 (Admin)
        // [Authorize(Roles = "Admin")]
        [HttpPost("Blog/DeleteArticle/{id}")] // Explicit route
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteArticleConfirmed(int id)
        {
            if (id <= 0) return NotFound();
            await _articleService.DeleteArticleAsync(id);
            return RedirectToAction(nameof(Manage));
        }

        // private async Task<bool> ArticleExists(int id)
        // {
        //    return (await _articleService.GetArticleByIdAsync(id)) != null;
        // }
    }
}
