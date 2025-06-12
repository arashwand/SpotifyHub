using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using SportifyHub.Models;
using SportifyHub.Services.Interfaces;
using SportifyHub.ViewModels; // For OrderViewModel
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System; // For DateTime

namespace SportifyHub.Controllers
{
    [Authorize]
    public class OrdersController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly UserManager<ApplicationUser> _userManager;
        // Assuming CartController.SessionExtensions is accessible or Cart is retrieved via a service
        // For simplicity, assuming cart items are passed to Create POST or re-fetched from session.

        public OrdersController(IOrderService orderService, UserManager<ApplicationUser> userManager)
        {
           _orderService = orderService;
           _userManager = userManager;
        }

        // GET: /Orders/Create (from CartController checkout)
        public async Task<IActionResult> Create()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();

            var cart = HttpContext.Session.GetObjectFromJson<List<CartItemViewModel>>(CartController.CartSessionKey) ?? new List<CartItemViewModel>();
            if (!cart.Any())
            {
                TempData["InfoMessage"] = "سبد خرید شما خالی است.";
                return RedirectToAction("Index", "Cart");
            }

            var orderViewModel = new OrderViewModel
            {
                UserId = user.Id,
                ShippingAddress = user.Address, // Pre-fill with user's address
                CartItems = cart,
                TotalAmount = cart.Sum(item => item.TotalPrice)
            };

            // ViewBag can still be used if some data is not in OrderViewModel
            // ViewBag.CartItems = cart;
            // ViewBag.TotalAmount = cart.Sum(item => item.TotalPrice);
            // ViewBag.ShippingAddress = user.Address;

            return View(orderViewModel);
        }

        // POST: /Orders/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(OrderViewModel orderViewModel)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();

            var cart = HttpContext.Session.GetObjectFromJson<List<CartItemViewModel>>(CartController.CartSessionKey) ?? new List<CartItemViewModel>();
            if (!cart.Any())
            {
                ModelState.AddModelError("", "سبد خرید شما خالی است.");
                // Re-populate view model for display
                orderViewModel.CartItems = cart;
                orderViewModel.TotalAmount = 0;
                return View(orderViewModel);
            }

            if (ModelState.IsValid)
            {
               var order = new Order
               {
                   UserId = user.Id,
                   ShippingAddress = orderViewModel.ShippingAddress,
                   OrderDate = DateTime.UtcNow,
                   Status = OrderStatus.Processing // Default status
                   // TotalAmount and OrderItems will be set by the service or here
               };

               // The IOrderService.CreateOrderAsync expects List<CartItem> (from IOrderService interface)
               // We have List<CartItemViewModel>. Need to map or adjust interface/service.
               // For now, assuming service can handle CartItemViewModel or a mapping occurs.
               // Let's pass the CartItemViewModel list as is.
               var result = await _orderService.CreateOrderAsync(order, cart); // This signature matches the one in IOrderService if CartItem is the one from Interfaces

               if (result.Success && result.CreatedOrder != null)
               {
                   HttpContext.Session.Remove(CartController.CartSessionKey); // Clear cart
                   TempData["SuccessMessage"] = $"سفارش شما با شماره پیگیری {result.CreatedOrder.Id} با موفقیت ثبت شد.";
                   return RedirectToAction("Details", new { id = result.CreatedOrder.Id });
               }
               ModelState.AddModelError("", result.ErrorMessage ?? "خطا در هنگام ایجاد سفارش.");
            }
            // If model state is invalid, re-populate necessary parts of view model
            orderViewModel.CartItems = cart;
            orderViewModel.TotalAmount = cart.Sum(item => item.TotalPrice);
            return View(orderViewModel);
        }

        // GET: /Orders (list user's orders)
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();
            var orders = await _orderService.GetOrdersByUserIdAsync(user.Id);
            return View(orders);
        }

        // GET: /Orders/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();

            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null || order.UserId != user.Id) // Ensure user owns the order or is admin
            {
                TempData["ErrorMessage"] = "سفارش یافت نشد یا شما اجازه دسترسی به آن را ندارید.";
                return RedirectToAction(nameof(Index));
            }
            return View(order);
        }
    }
}
