
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
  buttonText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    onSearch, 
    placeholder = "جستجو...", 
    className = "",
    buttonText = "جستجو" 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center w-full ${className}`}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rtl:left-0 rtl:right-auto rtl:pl-3">
          <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 pr-10 rtl:pl-10 rtl:pr-4 text-sm text-dark border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary placeholder-gray-400"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="text-white absolute left-2.5 bottom-2.5 rtl:right-2.5 rtl:left-auto bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
