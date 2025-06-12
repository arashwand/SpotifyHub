using Microsoft.EntityFrameworkCore;
using SportifyHub.Data;
using SportifyHub.Models;
using SportifyHub.Services.Interfaces;
using System; // Added for ArgumentNullException if uncommented
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services
{
    public class CoachService : ICoachService
    {
        private readonly ApplicationDbContext _context;

        public CoachService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Coach>> GetAllCoachesAsync()
        {
            // return await _context.Coaches
            //    .Include(c => c.Reviews)
            //    .Include(c => c.CoachSpecialties) // Assuming CoachSpecialty links to SportCategory enum or similar text
            //    .Include(c => c.FitnessClasses) // Classes taught by this coach
            //    .ToListAsync();

            System.Console.WriteLine("[CoachService.GetAllCoachesAsync] Called - DB interaction skipped.");
            return await Task.FromResult(new List<Coach>());
        }

        public async Task<Coach?> GetCoachByIdAsync(int id)
        {
            // return await _context.Coaches
            //    .Include(c => c.Reviews)
            //    .Include(c => c.CoachSpecialties)
            //    .Include(c => c.FitnessClasses)
            //    .FirstOrDefaultAsync(c => c.Id == id);

            System.Console.WriteLine($"[CoachService.GetCoachByIdAsync] Called with ID: {id} - DB interaction skipped.");
            return await Task.FromResult<Coach?>(null);
        }

        public async Task CreateCoachAsync(Coach coach)
        {
            // if (coach == null)
            // {
            //     throw new ArgumentNullException(nameof(coach));
            // }
            // _context.Coaches.Add(coach);
            // await _context.SaveChangesAsync();

            System.Console.WriteLine($"[CoachService.CreateCoachAsync] Called for coach: {coach?.Name} - DB interaction skipped.");
            await Task.CompletedTask;
        }

        public async Task UpdateCoachAsync(Coach coach)
        {
            // if (coach == null)
            // {
            //     throw new ArgumentNullException(nameof(coach));
            // }
            // _context.Entry(coach).State = EntityState.Modified;
            // // Handle CoachSpecialties updates carefully (remove old, add new, or compare)
            // await _context.SaveChangesAsync();

            System.Console.WriteLine($"[CoachService.UpdateCoachAsync] Called for coach: {coach?.Name} - DB interaction skipped.");
            await Task.CompletedTask;
        }

        public async Task DeleteCoachAsync(int id)
        {
            // var coach = await _context.Coaches.FindAsync(id);
            // if (coach != null)
            // {
            //     // Consider implications: what happens to FitnessClasses taught by this coach? Set FK to null?
            //     _context.Coaches.Remove(coach);
            //     await _context.SaveChangesAsync();
            // }

            System.Console.WriteLine($"[CoachService.DeleteCoachAsync] Called for ID: {id} - DB interaction skipped.");
            await Task.CompletedTask;
        }
    }
}
