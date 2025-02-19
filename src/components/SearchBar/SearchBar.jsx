import React from 'react';

const SearchBar = ({ onSearch, onFilter, onSort }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select onChange={(e) => onFilter(e.target.value || '')} className="w-full p-2 border rounded mt-2">
  <option value="">Sort by Priorities</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>
      <select onChange={(e) => onSort(e.target.value)} className="w-full p-2 border rounded mt-2">
        <option value="">Sort by Due Date</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      
    </div>
  );
};

export default SearchBar;