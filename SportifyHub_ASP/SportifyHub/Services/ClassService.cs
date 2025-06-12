using Microsoft.EntityFrameworkCore;
using SportifyHub.Data;
using SportifyHub.Models; // For FitnessClass
using SportifyHub.Services.Interfaces;
using System; // Added for ArgumentNullException if uncommented
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services
{
    public class ClassService : IClassService
    {
        private readonly ApplicationDbContext _context;

        public ClassService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FitnessClass>> GetAllClassesAsync()
        {
            // return await _context.FitnessClasses
            //    .Include(fc => fc.Instructor)
            //    .Include(fc => fc.Reviews)
            //    .ToListAsync();

            System.Console.WriteLine("[ClassService.GetAllClassesAsync] Called - DB interaction skipped.");
            return await Task.FromResult(new List<FitnessClass>());
        }

        public async Task<FitnessClass?> GetClassByIdAsync(int id)
        {
            // return await _context.FitnessClasses
            //    .Include(fc => fc.Instructor)
            //    .Include(fc => fc.Reviews)
            //    .FirstOrDefaultAsync(fc => fc.Id == id);

            System.Console.WriteLine($"[ClassService.GetClassByIdAsync] Called with ID: {id} - DB interaction skipped.");
            return await Task.FromResult<FitnessClass?>(null);
        }

        public async Task CreateClassAsync(FitnessClass fitnessClass)
        {
            // if (fitnessClass == null)
            // {
            //     throw new ArgumentNullException(nameof(fitnessClass));
            // }
            // _context.FitnessClasses.Add(fitnessClass);
            // await _context.SaveChangesAsync();

            System.Console.WriteLine($"[ClassService.CreateClassAsync] Called for class: {fitnessClass?.Name} - DB interaction skipped.");
            await Task.CompletedTask;
        }

        public async Task UpdateClassAsync(FitnessClass fitnessClass)
        {
            // if (fitnessClass == null)
            // {
            //     throw new ArgumentNullException(nameof(fitnessClass));
            // }
            // _context.Entry(fitnessClass).State = EntityState.Modified;
            // await _context.SaveChangesAsync();

            System.Console.WriteLine($"[ClassService.UpdateClassAsync] Called for class: {fitnessClass?.Name} - DB interaction skipped.");
            await Task.CompletedTask;
        }

        public async Task DeleteClassAsync(int id)
        {
            // var fitnessClass = await _context.FitnessClasses.FindAsync(id);
            // if (fitnessClass != null)
            // {
            //     _context.FitnessClasses.Remove(fitnessClass);
            //     await _context.SaveChangesAsync();
            // }

            System.Console.WriteLine($"[ClassService.DeleteClassAsync] Called for ID: {id} - DB interaction skipped.");
            await Task.CompletedTask;
        }
    }
}
