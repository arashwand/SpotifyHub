using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering; // For SelectList
using SportifyHub.Services.Interfaces;
using SportifyHub.Models; // For Product model
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json; // For Images JSON handling if needed (not used here as Images is ICollection<string>)
using System.Collections.Generic; // For List
using Microsoft.EntityFrameworkCore; // For DbUpdateConcurrencyException if uncommented


namespace SportifyHub.Controllers
{
    public class ShopController : Controller
    {
        private readonly IProductService _productService;
        // Consider adding ICategoryService if product categories become complex entities

        public ShopController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: Shop or Shop/Index (Public view of products)
        public async Task<IActionResult> Index()
        {
            var products = await _productService.GetAllProductsAsync();
            return View(products); // Assumes Views/Shop/Index.cshtml for public listing
        }

        // GET: Shop/Details/5 (Public view of product details)
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0) return NotFound();
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) return NotFound();

            // product.Images is already ICollection<string>
            return View(product); // Assumes Views/Shop/Details.cshtml
        }

        // --- Admin-focused CRUD operations ---

        // GET: Shop/Manage (Admin: List products for management)
        // [Authorize(Roles = "Admin")] // Example authorization
        public async Task<IActionResult> Manage()
        {
            var products = await _productService.GetAllProductsAsync();
            return View("ManageProducts", products); // Assumes Views/Shop/ManageProducts.cshtml
        }


        // GET: Shop/Create (Admin)
        // [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            // ViewBag.Categories = new SelectList(GetHardcodedCategories());
            return View("CreateProduct", new Product { Images = new List<string>() }); // Assumes Views/Shop/CreateProduct.cshtml
        }

        // POST: Shop/Create (Admin)
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateProduct([Bind("Name,Category,Description,Price,Stock")] Product product, List<string> images)
        {
            if (ModelState.IsValid)
            {
                product.Images = images ?? new List<string>();
                product.OrderItems ??= new List<OrderItem>(); // Initialize navigation properties

                await _productService.CreateProductAsync(product);
                return RedirectToAction(nameof(Manage));
            }
            // ViewBag.Categories = new SelectList(GetHardcodedCategories(), product.Category);
            return View("CreateProduct", product);
        }

        // GET: Shop/Edit/5 (Admin)
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Edit(int id)
        {
            if (id <= 0) return NotFound();
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) return NotFound();

            product.Images ??= new List<string>();
            // ViewBag.Categories = new SelectList(GetHardcodedCategories(), product.Category);
            return View("EditProduct", product); // Assumes Views/Shop/EditProduct.cshtml
        }

        // POST: Shop/Edit/5 (Admin)
        // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditProduct(int id, [Bind("Id,Name,Category,Description,Price,Stock,Rating")] Product product, List<string> images)
        {
            if (id != product.Id) return NotFound();

            if (ModelState.IsValid)
            {
                // Fetch existing product to correctly handle update of collection properties if needed,
                // or ensure service layer handles partial updates / collection merging.
                // For simplicity here, we directly pass the bound product with updated images.
                var existingProduct = await _productService.GetProductByIdAsync(id);
                if (existingProduct == null) return NotFound();

                existingProduct.Name = product.Name;
                existingProduct.Category = product.Category;
                existingProduct.Description = product.Description;
                existingProduct.Price = product.Price;
                existingProduct.Stock = product.Stock;
                existingProduct.Rating = product.Rating;
                existingProduct.Images = images ?? new List<string>();

                try
                {
                    await _productService.UpdateProductAsync(existingProduct);
                }
                catch (DbUpdateConcurrencyException)
                {
                     System.Console.WriteLine($"[ShopController.EditProduct POST] Concurrency error for ID: {id} (Simulated)");
                    // if (!await ProductExists(product.Id)) return NotFound(); else throw;
                }
                return RedirectToAction(nameof(Manage));
            }
            // ViewBag.Categories = new SelectList(GetHardcodedCategories(), product.Category);
            return View("EditProduct", product);
        }

        // GET: Shop/Delete/5 (Admin)
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0) return NotFound();
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) return NotFound();
            return View("DeleteProduct", product); // Assumes Views/Shop/DeleteProduct.cshtml
        }

        // POST: Shop/Delete/5 (Admin)
        // [Authorize(Roles = "Admin")]
        [HttpPost("Shop/DeleteProduct/{id}")] // Explicit route to avoid potential conflicts
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteProductConfirmed(int id)
        {
            if (id <= 0) return NotFound();
            await _productService.DeleteProductAsync(id);
            return RedirectToAction(nameof(Manage));
        }

        // private List<string> GetHardcodedCategories() {
        //    return new List<string> { "پوشاک", "تجهیزات", "تغذیه", "لوازم جانبی" };
        // }

        // private async Task<bool> ProductExists(int id)
        // {
        //     return (await _productService.GetProductByIdAsync(id)) != null;
        // }
    }
}
