import React, { useEffect, useState } from "react";
import { ChannelType } from "../vizoApi";
import { getChannelNameFromEnum } from "../Utils/StaticData";
import { Palette } from "../Static/Colors/piePalettes";

export interface DropDownOption {
  id?: string;
  name?: string;
  img?: string;
  channel?: ChannelType;
  ad_account_id?: string;
}

interface DropdownProps {
  options: DropDownOption[];
  onSelectOption: (selectedOption: DropDownOption) => void;
  defaultOption?: DropDownOption;
}

interface PaletteDropdownProps {
  options: Palette[];
  onSelectOption: (selectedOption: Palette) => void;
  defaultOption?: Palette;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelectOption,
  defaultOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropDownOption>();
  const [filterText, setFilterText] = useState("");

  const filteredOptions = options.filter((option) => {
    return option.name
      ? option.name.toLowerCase().includes(filterText.toLowerCase())
      : false;
  });

  const handleOptionClick = (option: DropDownOption) => {
    console.log(option);
    setSelectedOption(option);
    if (option !== selectedOption) {
      setIsOpen(false);
    }
    onSelectOption(option);
  };

  const getIconUrl = (imgPath: string) => {
    return require(`../Static/images/${imgPath}.png`);
  };

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  return (
    <div className="relative mb-5">
      <button
        className="block w-full bg-white border border-gray-400 shadow-sm py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none max-h-16 truncate"
        onClick={() => setIsOpen(true)}
      >
        {selectedOption && !isOpen ? (
          <div className="flex items-center">
            {selectedOption.img && (
              <img
                src={getIconUrl(selectedOption.img)}
                className="w-6 h-6 mr-2 flex-shrink-0"
              />
            )}
            <span className="font-medium mr-1 truncate">
              {selectedOption.channel
                ? getChannelNameFromEnum(selectedOption)
                : selectedOption.name}
            </span>
            {selectedOption.ad_account_id && (
              <span className="text-gray-500 text-xs truncate">
                ({selectedOption.ad_account_id})
              </span>
            )}
          </div>
        ) : (
          <input
            className="mt-0 pl-3 focus:outline-none h-[4vh]"
            placeholder="Select an option..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg">
          <ul className="py-1">
            {filteredOptions.map((option) => (
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
                  <span className="font-medium mr-1">
                    {" "}
                    {option.channel
                      ? getChannelNameFromEnum(option)
                      : option.name}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {option.ad_account_id && (
                      <span className="text-gray-500 text-xs truncate">
                        ({option.ad_account_id})
                      </span>
                    )}
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

export const PaletteDropdown: React.FC<PaletteDropdownProps> = ({
  options,
  onSelectOption,
  defaultOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Palette>();

  const handleSelectedOption = (option: Palette) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectOption(option);
  };

  return (
    <div className="relative mb-5">
      <button
        className="block w-full bg-white border border-gray-400 shadow-sm py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none max-h-16 truncate"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <div className="flex items-center">
            <div className="w-10 h-5 bg-white rounded p-1 flex justify-center items-center">
              <div
                className={`w-3 h-3 rounded-full absolute border border-white `}
                style={{
                  backgroundColor: selectedOption.colors[0],
                  left: "24px",
                }}
              ></div>
              <div
                className={`w-3 h-3 rounded-full absolute border border-white`}
                style={{ backgroundColor: selectedOption.colors[3] }}
              ></div>
              <div
                className={`w-3 h-3 rounded-full absolute border border-white`}
                style={{
                  backgroundColor: selectedOption.colors[5],
                  left: "36px",
                }}
              ></div>
            </div>
            <span className="font-medium ml-2 truncate text-gray-900">
              {selectedOption.name}
            </span>
          </div>
        ) : (
          "Select a theme"
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-50 border border-gray-400 rounded-md shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.name}
                className="relative px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectedOption(option)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-5 bg-white rounded p-1 flex justify-center items-center">
                    <div
                      className={`w-3 h-3 rounded-full absolute border border-white `}
                      style={{
                        backgroundColor: option.colors[0],
                        left: "24px",
                      }}
                    ></div>
                    <div
                      className={`w-3 h-3 rounded-full absolute border border-white`}
                      style={{ backgroundColor: option.colors[3] }}
                    ></div>
                    <div
                      className={`w-3 h-3 rounded-full absolute border border-white`}
                      style={{
                        backgroundColor: option.colors[5],
                        left: "36px",
                      }}
                    ></div>
                  </div>
                  <span className="font-medium ml-2 truncate text-gray-900">
                    {option.name}
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
