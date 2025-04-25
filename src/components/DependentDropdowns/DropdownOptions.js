import React from "react";

const DropdownOption = ({
  config,
  option,
  selectedValues,
  handleSelectChange,
}) => {
  const isDisabled =
    config.settings.disabled ||
    (config.dependencies.length > 0 &&
      (selectedValues[config.dependencies[0]] || []).length === 0);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={`${config.id}-${option.id}`}
        checked={(selectedValues[config.id] || []).includes(option.id)}
        disabled={isDisabled}
        onChange={(e) => {
          handleSelectChange(config.id, option.id, e.target.checked);
        }}
      />
      <label htmlFor={`${config.id}-${option.id}`}>{option.name}</label>
    </div>
  );
};

export default DropdownOption;
