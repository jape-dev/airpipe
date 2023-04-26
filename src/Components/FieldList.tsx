import React, { useState, useEffect } from "react";
import { AdAccount, ChannelType } from "../vizoApi";
import {
  googleMetricOptions,
  googleDimensionOptions,
  facebookMetricOptions,
  facebookDimensionOptions,
} from "../Data/Options";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface FieldListProps {
  adAccount: AdAccount;
}

interface MetricOption {
  value: string;
  label: string;
}

export const FieldList: React.FC<FieldListProps> = ({ adAccount }) => {
  const [metricOptions, setMetricOptions] = useState<MetricOption[]>();
  const [searchText, setSearchText] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<MetricOption[]>([]);

  useEffect(() => {
    if (adAccount.channel === ChannelType.GOOGLE) {
      setMetricOptions(googleMetricOptions);
    } else if (adAccount.channel === ChannelType.FACEBOOK) {
      setMetricOptions(facebookMetricOptions);
    }
  }, [adAccount]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = metricOptions?.find(
      (option) => option.value === event.target.value
    );
    if (selectedOption) {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  const handleRemove = (option: MetricOption) => {
    setSelectedOptions(selectedOptions.filter((o) => o.value !== option.value));
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="relative col-span-1">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search"
          className="block w-full bg-white border border-gray-400 shadow-sm py-2 px-4 rounded-md text-left focus:outline-none"
        />
        <div className="absolute right-2 top-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>
      <div className="relative col-span-1">
        <select
          multiple
          size={10}
          className="block w-full h-48 bg-white border border-gray-400 shadow-sm py-2 px-4 rounded-md text-left cursor-pointer focus:outline-none"
          onChange={handleSelect}
        >
          {metricOptions && (
            <>
              {metricOptions
                .filter((option) =>
                  option.label.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </>
          )}
        </select>
      </div>
      <div className="col-span-2">
        <h4 className="text-lg font-medium mb-2">Selected Options</h4>
        <ul className="border border-gray-400 rounded-md p-2">
          {selectedOptions.map((option) => (
            <li key={option.value} className="flex justify-between py-1">
              <span>{option.label}</span>
              <button
                className="ml-2 px-2 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                onClick={() => handleRemove(option)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
