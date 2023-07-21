import React, { useState, useEffect } from "react";
import { AdAccount, ChannelType, FieldType, FieldOption } from "../vizoApi";
import {
  googleMetricOptions,
  googleDimensionOptions,
  facebookMetricOptions,
  facebookDimensionOptions,
} from "../Data/Options";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface FieldListProps {
  adAccounts: AdAccount[];
  selectedOptions: FieldOption[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<FieldOption[]>>;
}

export const FieldList: React.FC<FieldListProps> = ({
  adAccounts,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [fieldOptions, setFieldOptions] = useState<FieldOption[]>([]);
  const [searchText, setSearchText] = useState("");
  const [fieldType, setFieldType] = useState<FieldType>(FieldType.METRIC);

  const getIconUrl = (imgPath: string) => {
    return require(`../Static/images/${imgPath}.png`);
  };

  useEffect(() => {
    let options: FieldOption[] = [];
    if (fieldType === FieldType.METRIC) {
      options = adAccounts.flatMap((adAccount) => {
        if (adAccount.channel === ChannelType.GOOGLE) {
          return googleMetricOptions;
        } else if (adAccount.channel === ChannelType.FACEBOOK) {
          return facebookMetricOptions;
        }
        return [];
      });
    } else if (fieldType === FieldType.DIMENSION) {
      options = adAccounts.flatMap((adAccount) => {
        if (adAccount.channel === ChannelType.GOOGLE) {
          return googleDimensionOptions;
        } else if (adAccount.channel === ChannelType.FACEBOOK) {
          return facebookDimensionOptions;
        }
        return [];
      });
    }
    // Filter out any options that have already been selected
    options = options.filter(
      (option) =>
        !selectedOptions.find((selected) => selected.value === option.value)
    );
    setFieldOptions(options);
  }, [adAccounts, fieldType]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = fieldOptions?.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      setSelectedOptions([...selectedOptions, selectedOption]);
      setFieldOptions(
        fieldOptions?.filter((option) => option.value !== selectedValue)
      );
    }
  };

  console.log(selectedOptions);

  const handleRemove = (option: FieldOption) => {
    setSelectedOptions(selectedOptions.filter((o) => o.value !== option.value));

    setFieldOptions((metricOptions) => {
      const options = [...metricOptions, option];
      const sortedOptions = options.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      const index = sortedOptions.indexOf(option);
      if (
        index !== -1 &&
        index < sortedOptions.length - 1 &&
        sortedOptions[index + 1].label === option.label
      ) {
        return metricOptions; // option already exists, return current state of metricOptions
      }
      return sortedOptions;
    });
  };

  const handleFieldTypeChange = (fieldType: FieldType) => {
    setFieldType(fieldType);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="relative col-span-1">
        <div className="flex items-center grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <input
              type="text"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search"
              className="block w-full bg-white border border-gray-400 shadow-sm h-10 mt-0 py-2 px-4 rounded-md text-left focus:outline-none"
            />
          </div>
          <div className="col-span-1">
            <div className="h-10">
              <button
                className={`px-4 py-2 rounded-l-md focus:outline-none ${
                  fieldType === FieldType.METRIC ? "bg-gray-300" : ""
                }`}
                onClick={() => handleFieldTypeChange(FieldType.METRIC)}
              >
                Metrics
              </button>
              <button
                className={`px-4 py-2 rounded-r-md focus:outline-none ${
                  fieldType === FieldType.DIMENSION ? "bg-gray-300" : ""
                }`}
                onClick={() => handleFieldTypeChange(FieldType.DIMENSION)}
              >
                Dimensions
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex items-center">
        <h4 className="text-lg font-medium">Selected Fields</h4>
      </div>
      <div className="col-span-1">
        <select
          multiple
          size={10}
          className="block w-full h-80 bg-white border border-gray-400 shadow-sm py-2 px-4 mt-0 rounded-md text-left cursor-pointer focus:outline-none"
          onChange={handleSelect}
        >
          {fieldOptions && (
            <>
              {fieldOptions
                .filter((option) =>
                  option.label.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((option) => (
                  <>
                    {option.img && (
                      <img
                        src={getIconUrl(option.img)}
                        className="w-6 h-6 mr-2 flex-shrink-0"
                      />
                    )}
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  </>
                ))}
            </>
          )}
        </select>
      </div>
      <div className="col-span-1">
        <ul
          className="border border-gray-400 bg-white rounded-md p-4 h-80 max-h-80 overflow-y-auto"
          placeholder="selected fields"
        >
          {selectedOptions.map((option) => (
            <li key={option.value} className="flex justify-between py-1">
              <span>{option.label}</span>
              <button
                className="ml-2 p-1 rounded-md text-gray-500 hover:text-gray-700"
                onClick={() => handleRemove(option)}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
};
