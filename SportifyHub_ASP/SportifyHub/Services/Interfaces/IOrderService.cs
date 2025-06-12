using SportifyHub.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync(); // Admin
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
        Task<Order?> GetOrderByIdAsync(int id);
        Task<OrderResult> CreateOrderAsync(Order order, List<CartItem> cartItems); // Using CartItem defined below or from ViewModels
    }

    public record OrderResult(bool Success, string? ErrorMessage = null, Order? CreatedOrder = null);

    // Temporary CartItem definition for service method signature.
    // Ideally, this would be a ViewModel or a shared type in a ViewModels folder.
    // Based on types.ts: interface CartItem extends Product { quantity: number; }
    // For simplicity here, it's a local definition for the interface contract.
    public class CartItem
    {
        public int ProductId {get; set;} // Corresponds to Product.Id
        public string ProductName { get; set; } = string.Empty; // For convenience, from Product.Name
        public int Quantity {get; set;}
        public decimal Price { get; set; } // Price at time of adding to cart, from Product.Price
        public int Stock {get; set; } // from Product.Stock, for checking availability during order creation
    }
}
