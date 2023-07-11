import React, { useState } from "react";

export interface DropDownOption {
  id: string;
  name?: string;
  img?: string;
}

interface DropdownProps {
  options: DropDownOption[];
  onSelectOption: (selectedOption: DropDownOption) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelectOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropDownOption>();

  const handleOptionClick = (option: DropDownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectOption(option);
  };

  const getIconUrl = (imgPath: string) => {
    return require(`../Static/images/${imgPath}.png`);
  };

  return (
    <div className="relative mb-5">
      <button
        className="block w-full bg-white border border-gray-400 shadow-sm py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <div className="flex items-center">
            {selectedOption.img && (
              <img
                src={getIconUrl(selectedOption.img)}
                className="w-6 h-6 mr-2 flex-shrink-0"
              />
            )}
            <span className="font-medium mr-1">{selectedOption.name}</span>
            <span className="text-gray-500 text-xs">
              ({selectedOption.id.toLowerCase()})
            </span>
          </div>
        ) : (
          "Select an option"
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                <div className="flex items-center">
                  {option.img && (
                    <img
                      src={getIconUrl(option.img)}
                      className="w-6 h-6 mr-2 flex-shrink-0"
                    />
                  )}
                  <span className="font-medium mr-1">{option.name}</span>
                  <span className="text-gray-500 text-xs">
                    ({option.id.toLowerCase()})
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
