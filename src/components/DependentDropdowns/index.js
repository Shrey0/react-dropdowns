import React from "react";
import { Snackbar } from "@mui/material";
import { dropdownConfig } from "./config";
import { useDropdownLogic } from "./hooks/useDropdownLogic";
import DropdownContainer from "./DropdownContainer";

const DependentDropdowns = () => {
  const {
    selectedValues,
    searchText,
    snackbar,
    setSnackbar,
    handleSelectChange,
    filteredOptions,
    handleSearchChange,
  } = useDropdownLogic();

  return (
    <div className="p-4 space-y-4">
      {dropdownConfig.map((config) => (
        <DropdownContainer
          key={config.id}
          config={config}
          selectedValues={selectedValues}
          searchText={searchText}
          handleSearchChange={handleSearchChange}
          handleSelectChange={handleSelectChange}
          filteredOptions={filteredOptions}
        />
      ))}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </div>
  );
};

export default DependentDropdowns;
