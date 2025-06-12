
import React from 'react';
import { FilterGroup, FilterOption } from '../../types'; // Adjust path if needed

interface FilterPanelProps {
  filterGroups: FilterGroup[];
  currentFilters: Record<string, string | string[]>; // { groupId: value or [value1, value2] }
  onFilterChange: (groupId: string, value: string) => void; // Simplified: handles one value change at a time
  onResetFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filterGroups, currentFilters, onFilterChange, onResetFilters }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-vazir font-semibold text-dark">فیلترها</h3>
        <button onClick={onResetFilters} className="text-sm text-primary hover:underline">
          پاک کردن همه
        </button>
      </div>
      {filterGroups.map((group) => (
        <div key={group.id} className="mb-6">
          <h4 className="font-semibold text-medium-dark mb-2">{group.name}</h4>
          {group.type === 'select' && (
            <select
              value={(currentFilters[group.id] as string) || ''}
              onChange={(e) => onFilterChange(group.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            >
              {group.options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
          {group.type === 'checkbox' && ( // Example, assuming single select for simplicity in handler
             group.options.map((option) => (
                <label key={option.id} className="flex items-center space-x-2 rtl:space-x-reverse mb-1 text-sm text-gray-700">
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={Array.isArray(currentFilters[group.id]) ? (currentFilters[group.id] as string[]).includes(option.value) : currentFilters[group.id] === option.value}
                        onChange={(e) => onFilterChange(group.id, e.target.value)} // Needs more complex handler for multi-checkbox
                        className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span>{option.name}</span>
                </label>
             ))
          )}
          {/* Add other filter types like radio, range slider here */}
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
