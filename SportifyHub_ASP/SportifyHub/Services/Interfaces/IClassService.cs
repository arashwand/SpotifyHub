using SportifyHub.Models; // For FitnessClass
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services.Interfaces
{
    public interface IClassService // Or IFitnessClassService if preferred
    {
        Task<IEnumerable<FitnessClass>> GetAllClassesAsync();
        Task<FitnessClass?> GetClassByIdAsync(int id);
        Task CreateClassAsync(FitnessClass fitnessClass);
        Task UpdateClassAsync(FitnessClass fitnessClass);
        Task DeleteClassAsync(int id);
        // Add other specific methods, e.g., search by type, instructor, skill level
    }
}
