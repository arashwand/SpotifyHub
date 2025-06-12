using SportifyHub.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services.Interfaces
{
    public interface IArticleService
    {
        Task<IEnumerable<Article>> GetAllArticlesAsync();
        Task<Article?> GetArticleByIdAsync(int id);
        Task CreateArticleAsync(Article article);
        Task UpdateArticleAsync(Article article);
        Task DeleteArticleAsync(int id);
        // Task<IEnumerable<Article>> GetArticlesByCategoryAsync(string category);
        // Task<IEnumerable<Article>> GetRecentArticlesAsync(int count);
    }
}
