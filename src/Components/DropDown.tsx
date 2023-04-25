import React, { useState } from "react";
import { AdAccount } from "../vizoApi";

interface DropdownProps {
  options: AdAccount[];
  onSelectOption: (selectedOption: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelectOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectOption(option);
  };

  const getIconUrl = (imgPath: string) => {
    return require(`../Static/images/${imgPath}.png`);
  };

  return (
    <div className="relative">
      <button
        className="block w-full bg-white border border-gray-400 shadow-sm py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || "Select an option"}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option.id)}
              >
                <div className="flex items-center">
                  {option.img && (
                    <img
                      src={getIconUrl(option.img)}
                      alt={option.name}
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
