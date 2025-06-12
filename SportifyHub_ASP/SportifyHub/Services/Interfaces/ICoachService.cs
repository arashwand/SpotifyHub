using SportifyHub.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportifyHub.Services.Interfaces
{
    public interface ICoachService
    {
        Task<IEnumerable<Coach>> GetAllCoachesAsync();
        Task<Coach?> GetCoachByIdAsync(int id);
        Task CreateCoachAsync(Coach coach);
        Task UpdateCoachAsync(Coach coach);
        Task DeleteCoachAsync(int id);
        // Add other specific methods, e.g., search by specialty
    }
}
