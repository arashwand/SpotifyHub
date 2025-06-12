using Microsoft.EntityFrameworkCore;
using SportifyHub.Data;
using SportifyHub.Models;
using SportifyHub.Services.Interfaces;
using System; // Added for ArgumentNullException if uncommented
using System.Collections.Generic;
using System.Linq; // Added for OrderByDescending if uncommented
using System.Threading.Tasks;

namespace SportifyHub.Services
{
    public class ArticleService : IArticleService
    {
        private readonly ApplicationDbContext _context;

        public ArticleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Article>> GetAllArticlesAsync()
        {
            // return await _context.Articles.OrderByDescending(a => a.Date).ToListAsync();
            System.Console.WriteLine("[ArticleService.GetAllArticlesAsync] Called - DB interaction skipped.");
            return await Task.FromResult(new List<Article>());
        }

        public async Task<Article?> GetArticleByIdAsync(int id)
        {
            // return await _context.Articles.FindAsync(id);
            System.Console.WriteLine($"[ArticleService.GetArticleByIdAsync] Called with ID: {id} - DB interaction skipped.");
            return await Task.FromResult<Article?>(null);
        }

        public async Task CreateArticleAsync(Article article)
        {
            // if (article == null)
            // {
            //     throw new ArgumentNullException(nameof(article));
            // }
            // _context.Articles.Add(article);
            // await _context.SaveChangesAsync();
            System.Console.WriteLine($"[ArticleService.CreateArticleAsync] Called for article: {article?.Title} - DB interaction skipped.");
            await Task.CompletedTask;
        }

        public async Task UpdateArticleAsync(Article article)
        {
            // if (article == null)
            // {
            //     throw new ArgumentNullException(nameof(article));
            // }
            // _context.Entry(article).State = EntityState.Modified;
            // await _context.SaveChangesAsync();
            System.Console.WriteLine($"[ArticleService.UpdateArticleAsync] Called for article: {article?.Title} - DB interaction skipped.");
            await Task.CompletedTask;
        }

        public async Task DeleteArticleAsync(int id)
        {
            // var article = await _context.Articles.FindAsync(id);
            // if (article != null)
            // {
            //     _context.Articles.Remove(article);
            //     await _context.SaveChangesAsync();
            // }
            System.Console.WriteLine($"[ArticleService.DeleteArticleAsync] Called for ID: {id} - DB interaction skipped.");
            await Task.CompletedTask;
        }
    }
}
