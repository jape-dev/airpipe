import React, { useState } from "react";
import { Dropdown, DropDownOption } from "./DropDown";
import { FieldOption } from "../vizoApi";
import {
  fieldOptionsToDropDownOptions,
  fieldOptionToDropDownOption,
} from "../Utils/form";

export interface ChartConfigProps {
  limit: number;
  ascending: boolean;
  setAscending: React.Dispatch<React.SetStateAction<boolean>>;
  chartType: string | undefined;
  sortBy: FieldOption | undefined;
  metricOptions: FieldOption[];
  dimensionOptions: FieldOption[];
  selectedMetric: FieldOption | undefined;
  selectedDimension: FieldOption | undefined;
  handleSelectedOption: (option: DropDownOption) => void;
  hanldeSortByOption: (option: DropDownOption) => void;
  handleSliderValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChartConfig: React.FC<ChartConfigProps> = ({
  limit,
  ascending,
  setAscending,
  chartType,
  sortBy,
  metricOptions,
  dimensionOptions,
  selectedMetric,
  selectedDimension,
  handleSelectedOption,
  hanldeSortByOption,
  handleSliderValue,
}) => {
  return (
    <>
      <h3 className="text-md leading-6 font-medium text-gray-900 mb-2">
        Chart set-up
      </h3>
      <div className="border boder-gray-200 rounded-md mt-0 w-full p-4">
        <h4 className="text-md leading-6 font-medium text-gray-900 mb-2">
          Metric (y-axis)
        </h4>
        <Dropdown
          options={fieldOptionsToDropDownOptions(metricOptions)}
          onSelectOption={handleSelectedOption}
          defaultOption={fieldOptionToDropDownOption(selectedMetric)}
        />
        <h4 className="text-md leading-6 font-medium text-gray-900 mb-2">
          Dimension (x-axis)
        </h4>
        <Dropdown
          options={fieldOptionsToDropDownOptions(dimensionOptions)}
          onSelectOption={handleSelectedOption}
          defaultOption={fieldOptionToDropDownOption(selectedDimension)}
        />
        {selectedMetric && selectedDimension && (
          <>
            <h4 className="text-md leading-6 font-medium text-gray-900 mb-2">
              Sort By
            </h4>
            <div className="grid grid-cols-9 space-x-3">
              <div className="col-span-4">
                <Dropdown
                  options={fieldOptionsToDropDownOptions([
                    selectedMetric,
                    selectedDimension,
                  ])}
                  onSelectOption={hanldeSortByOption}
                  defaultOption={fieldOptionToDropDownOption(selectedMetric)}
                />
              </div>
              <div className="col-span-5">
                <div className="h-10">
                  <button
                    className={`px-2 py-2 rounded-l-md focus:outline-none  ${
                      ascending ? "bg-gray-300" : "bg-gray-100"
                    }`}
                    onClick={() => setAscending(true)}
                  >
                    Ascending
                  </button>
                  <button
                    className={`px-4 py-2 rounded-r-md focus:outline-none ${
                      ascending ? "bg-gray-100" : "bg-gray-300"
                    }`}
                    onClick={() => setAscending(false)}
                  >
                    Descending
                  </button>
                </div>
              </div>
            </div>
            <h4 className="text-md leading-6 font-medium text-gray-900 mb-2">
              Number of items
            </h4>
            <div className="grid grid-cols-9 space-x-3">
              <div className="col-span-6 px-2">
                <div className="relative flex items-center">
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={limit}
                    onChange={handleSliderValue}
                    className="bg-gray-200 accent-gray-500 appearance-none pl-0 h-3 mt-2 rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm">5</span>
                  <span className="text-sm">20</span>
                </div>
              </div>

              <div className="col-span-2 p-4 text-center h-10 border-2 border-gray-300 rounded-md w-half flex items-center justify-center">
                <p className="text-md font-medium">{limit}</p>
              </div>
              <div className="col-span-1"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
