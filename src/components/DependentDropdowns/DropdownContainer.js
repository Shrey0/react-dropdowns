import React from "react";
import SearchInput from "./SearchInput";
import DropdownOption from "./DropdownOptions";

const DropdownContainer = ({
  config,
  selectedValues,
  searchText,
  handleSearchChange,
  handleSelectChange,
  filteredOptions,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={config.id} className="block mb-1 font-medium">
        {config.id}
      </label>

      {config.settings.enableSearch && (
        <SearchInput
          dropdownId={config.id}
          searchText={searchText}
          handleSearchChange={handleSearchChange}
        />
      )}

      <div className="mb-2 space-y-1">
        {filteredOptions(config.id).map((option) => (
          <DropdownOption
            key={option.id}
            config={config}
            option={option}
            selectedValues={selectedValues}
            handleSelectChange={handleSelectChange}
          />
        ))}
      </div>
    </div>
  );
};

export default DropdownContainer;
