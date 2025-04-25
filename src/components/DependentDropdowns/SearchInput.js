import React from "react";

const SearchInput = ({ dropdownId, searchText, handleSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchText[dropdownId] || ""}
      onChange={(e) => handleSearchChange(dropdownId, e.target.value)}
      className="w-full mb-2 border rounded p-2"
    />
  );
};

export default SearchInput;
