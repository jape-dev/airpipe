import React, { useEffect, useState } from "react";
import { ChannelType } from "../vizoApi";

export interface DropDownOption {
  id: string;
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

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelectOption,
  defaultOption,
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

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  const getChannelNameFromEnum = (selectedOption: DropDownOption) => {
    if (selectedOption.channel === ChannelType.GOOGLE) {
      return "Google Ads";
    } else if (selectedOption.channel === ChannelType.FACEBOOK) {
      return "Facebook Ads";
    } else if (selectedOption.channel === ChannelType.GOOGLE_ANALYTICS) {
      return "Google Analytics";
    }
  };

  return (
    <div className="relative mb-5">
      <button
        className="block w-full bg-white border border-gray-400 shadow-sm py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none max-h-16 truncate"
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
            <span className="font-medium mr-1 truncate">
              {selectedOption.channel
                ? getChannelNameFromEnum(selectedOption)
                : selectedOption.name}
            </span>
            <span className="text-gray-500 text-xs truncate">
              (
              {selectedOption.ad_account_id
                ? selectedOption.ad_account_id.toLowerCase()
                : selectedOption.id.toLowerCase()}
              )
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
                  <span className="font-medium mr-1">
                    {" "}
                    {option.channel
                      ? getChannelNameFromEnum(option)
                      : option.name}
                  </span>
                  <span className="text-gray-500 text-xs">
                    (
                    {option.ad_account_id
                      ? option.ad_account_id.toLowerCase()
                      : option.id.toLowerCase()}
                    )
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
