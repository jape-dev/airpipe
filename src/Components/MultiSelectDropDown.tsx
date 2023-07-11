import React, { useState, useRef, useEffect } from "react";

export interface DropDownOption {
  id: string;
  name?: string;
  img?: string;
}

interface MultiSelectDropDownProps {
  options: DropDownOption[];
  onSelectOptions: (selectedOptions: DropDownOption[]) => void;
}

export const MultiSelectDropDown: React.FC<MultiSelectDropDownProps> = ({
  options,
  onSelectOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<DropDownOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: DropDownOption) => {
    const isOptionSelected = selectedOptions.includes(option);
    if (isOptionSelected) {
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
      setSelectedOptions(updatedOptions);
    } else {
      const updatedOptions = [...selectedOptions, option];
      onSelectOptions(updatedOptions);
      setSelectedOptions(updatedOptions);
      setIsOpen(false);
    }
  };

  const handleToggleOption = () => {
    setIsOpen(!isOpen);
  };

  const getIconUrl = (imgPath: string) => {
    return require(`../Static/images/${imgPath}.png`);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="relative mb-5">
      <button
        className="block w-full bg-white border border-gray-400 shadow-sm py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none"
        onClick={handleToggleOption}
      >
        {selectedOptions.length > 0 ? (
          <div>
            {selectedOptions.map((selectedOption) => (
              <div className="flex items-center mt-2" key={selectedOption.id}>
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
            ))}
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
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedOptions.includes(option) ? "bg-gray-100" : ""
                }`}
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
