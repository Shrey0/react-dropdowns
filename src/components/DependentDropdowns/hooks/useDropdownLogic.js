import { useState, useEffect, useRef } from "react";
import { dropdownConfig } from "../config";

export const useDropdownLogic = () => {
  const [dropdownData, setDropdownData] = useState({});
  const [selectedValues, setSelectedValues] = useState({
    dropdown1: [],
    dropdown2: [],
    dropdown3: [],
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [searchText, setSearchText] = useState({});

  const selectedValuesRef = useRef(selectedValues);

  useEffect(() => {
    selectedValuesRef.current = selectedValues;
  }, [selectedValues]);

  const fetchDropdownData = (dropdownId) => {
    const config = dropdownConfig.find((d) => d.id === dropdownId);
    if (!config || !config.data) return;

    const { response } = config.data;
    const currentSelectedValues = { ...selectedValuesRef.current };

    let formattedData;
    if (config.dependencies.length > 0) {
      const dependencyId = config.dependencies[0];
      formattedData = response.formatter(
        currentSelectedValues[dependencyId] || []
      );

      if ((currentSelectedValues[dependencyId] || []).length === 0) {
        formattedData = [];
        config.settings.disabled = true;
      } else {
        config.settings.disabled = false;
      }
    } else {
      formattedData = response.formatter();
    }

    setDropdownData((prev) => ({ ...prev, [dropdownId]: formattedData }));
  };

  useEffect(() => {
    fetchDropdownData("dropdown1");
  }, []);

  const handleSelectChange = (dropdownId, value, isChecked) => {
    setSelectedValues((prev) => {
      const newState = { ...prev };

      if (isChecked !== undefined) {
        const currentValues = [...(prev[dropdownId] || [])];
        if (isChecked) {
          if (!currentValues.includes(value)) {
            currentValues.push(value);
          }
        } else {
          const index = currentValues.indexOf(value);
          if (index !== -1) {
            currentValues.splice(index, 1);
          }
        }
        newState[dropdownId] = currentValues;
      } else {
        newState[dropdownId] = value;
      }

      const dependentDropdowns = [];
      const findDependents = (parentId) => {
        dropdownConfig.forEach((config) => {
          if (
            config.dependencies.includes(parentId) &&
            !dependentDropdowns.includes(config.id)
          ) {
            dependentDropdowns.push(config.id);
            findDependents(config.id);
          }
        });
      };
      findDependents(dropdownId);

      dependentDropdowns.forEach((depId) => {
        newState[depId] = [];
      });

      return newState;
    });

    setTimeout(() => {
      if (dropdownId === "dropdown1") {
        fetchDropdownData("dropdown2");
      }

      dropdownConfig.forEach((config) => {
        if (config.dependencies.includes(dropdownId)) {
          const parentValues = selectedValues[dropdownId] || [];
          if (isChecked === false && parentValues.length <= 1) {
            config.settings.disabled = true;
          } else {
            config.settings.disabled =
              parentValues.filter((v) => v !== value).length === 0 &&
              !isChecked;
          }
          fetchDropdownData(config.id);
        }
      });
    }, 0);
  };

  const filteredOptions = (dropdownId) => {
    const options = dropdownData[dropdownId] || [];
    const search = searchText[dropdownId]?.toLowerCase() || "";
    return options.filter((option) =>
      option.name.toLowerCase().includes(search)
    );
  };

  const handleSearchChange = (dropdownId, text) => {
    setSearchText((prev) => ({ ...prev, [dropdownId]: text }));
  };

  return {
    selectedValues,
    dropdownData,
    snackbar,
    searchText,
    setSnackbar,
    fetchDropdownData,
    handleSelectChange,
    filteredOptions,
    handleSearchChange,
  };
};
