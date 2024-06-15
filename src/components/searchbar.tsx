// src/app/components/SearchBar.tsx
"use client";
import React, { useState } from 'react';
import SearchBarCSS from '@/styles/SearchBar.module.css';
import loupe from '@/images/loupe.png';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const results = await response.json();
      setSearchResults(results);
      console.log('搜索结果:', results);
    } catch (error) {
      console.error('搜索出错:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className={SearchBarCSS.searchBar}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit" className="rounded">
          <img src={loupe.src} alt="loupe" />
        </button>
      </form>
      <div className={SearchBarCSS.results}>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.name}</li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;