using Microsoft.EntityFrameworkCore;
using SportifyHub.Data;
using SportifyHub.Models;
using SportifyHub.Services.Interfaces;
using System; // Added for ArgumentNullException if uncommented
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            // return await _context.Products.ToListAsync();
            System.Console.WriteLine("[ProductService.GetAllProductsAsync] Called - DB interaction skipped.");
            return await Task.FromResult(new List<Product>());
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            // return await _context.Products.FindAsync(id);
            System.Console.WriteLine($"[ProductService.GetProductByIdAsync] Called with ID: {id} - DB interaction skipped.");
            return await Task.FromResult<Product?>(null);
        }

        public async Task CreateProductAsync(Product product)
        {
            // if (product == null)
            // {
            //     throw new ArgumentNullException(nameof(product));
            // }
            // _context.Products.Add(product);
            // await _context.SaveChangesAsync();
            System.Console.WriteLine($"[ProductService.CreateProductAsync] Called for product: {product?.Name} - DB interaction skipped.");
            await Task.CompletedTask;
        }

        public async Task UpdateProductAsync(Product product)
        {
            // if (product == null)
            // {
            //     throw new ArgumentNullException(nameof(product));
            // }
            // _context.Entry(product).State = EntityState.Modified;
            // await _context.SaveChangesAsync();
            System.Console.WriteLine($"[ProductService.UpdateProductAsync] Called for product: {product?.Name} - DB interaction skipped.");
            await Task.CompletedTask;
        }

        public async Task DeleteProductAsync(int id)
        {
            // var product = await _context.Products.FindAsync(id);
            // if (product != null)
            // {
            //     _context.Products.Remove(product);
            //     await _context.SaveChangesAsync();
            // }
            System.Console.WriteLine($"[ProductService.DeleteProductAsync] Called for ID: {id} - DB interaction skipped.");
            await Task.CompletedTask;
        }
    }
}
