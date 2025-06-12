using SportifyHub.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(int id);
        Task CreateProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(int id);
        // Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category);
    }
}
