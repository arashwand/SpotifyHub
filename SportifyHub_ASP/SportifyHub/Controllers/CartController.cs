using Microsoft.AspNetCore.Mvc;
using SportifyHub.Services.Interfaces;
using SportifyHub.Models; // For Product
// using SportifyHub.ViewModels; // For CartViewModel, CartItemViewModel (if moved later)
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System; // For TimeSpan in session options if configuring here (though done in Program.cs)
using SportifyHub.ViewModels; // Added for CartItemViewModel

namespace SportifyHub.Controllers
{
    // Extension methods for session serialization
    public static class SessionExtensions
    {
        public static void SetObjectAsJson<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static T? GetObjectFromJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : JsonSerializer.Deserialize<T>(value);
        }
    }

    public class CartController : Controller
    {
        private readonly IProductService _productService;
        private const string CartSessionKey = "ShoppingCart";

        public CartController(IProductService productService)
        {
            _productService = productService;
        }

        private List<CartItemViewModel> GetCart()
        {
            return HttpContext.Session.GetObjectFromJson<List<CartItemViewModel>>(CartSessionKey) ?? new List<CartItemViewModel>();
        }

        private void SaveCart(List<CartItemViewModel> cart)
        {
            HttpContext.Session.SetObjectAsJson(CartSessionKey, cart);
        }

        // GET: Cart
        public IActionResult Index()
        {
            var cart = GetCart();
            ViewBag.TotalAmount = cart.Sum(item => item.TotalPrice);
            return View(cart); // Assumes Views/Cart/Index.cshtml
        }

        // POST: Cart/AddToCart/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddToCart(int productId, int quantity = 1)
        {
            if (productId <= 0 || quantity <= 0)
            {
                TempData["ErrorMessage"] = "Invalid product or quantity.";
                return RedirectToAction("Index", "Shop");
            }

            var product = await _productService.GetProductByIdAsync(productId);
            if (product == null)
            {
                TempData["ErrorMessage"] = "Product not found.";
                return NotFound();
            }

            var cart = GetCart();
            var cartItem = cart.FirstOrDefault(item => item.ProductId == productId);

            if (cartItem != null)
            {
                cartItem.Quantity += quantity;
            }
            else
            {
                cart.Add(new CartItemViewModel
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    UnitPrice = product.Price,
                    Quantity = quantity,
                    ImageUrl = product.Images?.FirstOrDefault()
                });
            }
            SaveCart(cart);
            TempData["SuccessMessage"] = $"'{product.Name}' added to cart.";

            string referer = Request.Headers["Referer"].ToString();
            if (!string.IsNullOrEmpty(referer)) return Redirect(referer);
            return RedirectToAction("Index", "Shop");
        }

        // POST: Cart/RemoveFromCart/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult RemoveFromCart(int productId)
        {
            if (productId <= 0)
            {
                TempData["ErrorMessage"] = "Invalid product ID.";
                return RedirectToAction(nameof(Index));
            }

            var cart = GetCart();
            var itemToRemove = cart.FirstOrDefault(item => item.ProductId == productId);

            if (itemToRemove != null)
            {
                cart.Remove(itemToRemove);
                SaveCart(cart);
                TempData["SuccessMessage"] = $"Item removed from cart.";
            }
            else
            {
                TempData["ErrorMessage"] = "Item not found in cart.";
            }
            return RedirectToAction(nameof(Index));
        }

        // POST: Cart/UpdateQuantity
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult UpdateQuantity(int productId, int quantity)
        {
            if (productId <= 0)
            {
                TempData["ErrorMessage"] = "Invalid product ID.";
                return RedirectToAction(nameof(Index));
            }
            if (quantity <= 0)
            {
                return RemoveFromCart(productId);
            }

            var cart = GetCart();
            var itemToUpdate = cart.FirstOrDefault(item => item.ProductId == productId);

            if (itemToUpdate != null)
            {
                itemToUpdate.Quantity = quantity;
                SaveCart(cart);
                TempData["SuccessMessage"] = "Cart updated.";
            }
            else
            {
                TempData["ErrorMessage"] = "Item not found in cart.";
            }
            return RedirectToAction(nameof(Index));
        }

        // GET: Cart/Checkout
        [Authorize]
        public IActionResult Checkout()
        {
            var cart = GetCart();
            if (!cart.Any())
            {
                TempData["InfoMessage"] = "Your cart is empty.";
                return RedirectToAction(nameof(Index));
            }
            // In a real app, pass cart to an Order creation ViewModel or service
            // For now, assume OrdersController.Create will handle cart retrieval or it's passed.
            // TempData could be used, but it's better if OrdersController can fetch the cart itself (e.g. from session or a service)
            return RedirectToAction("Create", "Orders"); // Assumes an OrdersController.Create GET action exists
        }
    }
}
