using Microsoft.EntityFrameworkCore;
using SportifyHub.Data;
using SportifyHub.Models;
using SportifyHub.Services.Interfaces; // For IOrderService, OrderResult, and local CartItem
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportifyHub.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            // return await _context.Orders
            //     .Include(o => o.User)
            //     .Include(o => o.OrderItems)
            //     .ThenInclude(oi => oi.Product)
            //     .OrderByDescending(o => o.OrderDate)
            //     .ToListAsync();
            System.Console.WriteLine("[OrderService.GetAllOrdersAsync] Called - DB interaction skipped.");
            return await Task.FromResult(new List<Order>());
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
        {
            // if (string.IsNullOrEmpty(userId))
            // {
            //     return new List<Order>();
            // }
            // return await _context.Orders
            //     .Where(o => o.UserId == userId)
            //     .Include(o => o.User)
            //     .Include(o => o.OrderItems)
            //     .ThenInclude(oi => oi.Product)
            //     .OrderByDescending(o => o.OrderDate)
            //     .ToListAsync();
            System.Console.WriteLine($"[OrderService.GetOrdersByUserIdAsync] Called for User ID: {userId} - DB interaction skipped.");
            return await Task.FromResult(new List<Order>());
        }

        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            // return await _context.Orders
            //     .Include(o => o.User)
            //     .Include(o => o.OrderItems)
            //     .ThenInclude(oi => oi.Product)
            //     .FirstOrDefaultAsync(o => o.Id == id);
            System.Console.WriteLine($"[OrderService.GetOrderByIdAsync] Called with ID: {id} - DB interaction skipped.");
            return await Task.FromResult<Order?>(null);
        }

        public async Task<OrderResult> CreateOrderAsync(Order order, List<CartItem> cartItems)
        {
            // if (order == null || cartItems == null || !cartItems.Any())
            // {
            //     return new OrderResult(false, "Invalid order or cart items.");
            // }

            // using var transaction = await _context.Database.BeginTransactionAsync();
            // try
            // {
            //     order.OrderItems = new List<OrderItem>();
            //     decimal totalAmount = 0;

            //     foreach (var cartItem in cartItems)
            //     {
            //         // Assuming cartItem.ProductId is the ID of the product
            //         var product = await _context.Products.FindAsync(cartItem.ProductId);
            //         if (product == null || product.Stock < cartItem.Quantity)
            //         {
            //             await transaction.RollbackAsync();
            //             return new OrderResult(false, $"Product {cartItem.ProductName} is out of stock or unavailable.");
            //         }

            //         var orderItem = new OrderItem
            //         {
            //             // OrderId will be set by EF Core relationship
            //             Product = product,
            //             ProductId = product.Id,
            //             Quantity = cartItem.Quantity,
            //             UnitPrice = product.Price // Price at the time of order
            //         };
            //         order.OrderItems.Add(orderItem);
            //         totalAmount += orderItem.Quantity * orderItem.UnitPrice;
            //         product.Stock -= cartItem.Quantity;
            //     }

            //     order.TotalAmount = totalAmount;
            //     order.OrderDate = DateTime.UtcNow;
            //     order.Status = Models.OrderStatus.Processing; // Assuming OrderStatus enum is in Models

            //     _context.Orders.Add(order);
            //     await _context.SaveChangesAsync();
            //     await transaction.CommitAsync();

            //     return new OrderResult(true, CreatedOrder: order);
            // }
            // catch (Exception ex)
            // {
            //     await transaction.RollbackAsync();
            //     System.Console.WriteLine($"[OrderService.CreateOrderAsync] Error: {ex.Message}");
            //     return new OrderResult(false, "An error occurred while creating the order.");
            // }

            System.Console.WriteLine($"[OrderService.CreateOrderAsync] Called for order for user: {order?.UserId} - DB interaction skipped.");
            if (order != null) order.Id = new Random().Next(1000,9999); // Simulate ID generation
            return await Task.FromResult(new OrderResult(true, CreatedOrder: order));
        }
    }
}
