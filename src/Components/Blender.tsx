import React, { useState, useEffect } from "react";
import {
  DefaultService,
  FieldOption,
  FieldOptionWithDataSourceId,
  DataSourceInDB,
} from "../vizoApi";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { Dropdown, DropDownOption } from "../Components/DropDown";
interface BlenderProps {
  fieldOptions: FieldOption[];
  dataSources: DataSourceInDB[];
  selectedDataSource: DataSourceInDB;
  dropDownOptions: DropDownOption[];
  selectedOption?: DropDownOption;
  leftDataSource?: DataSourceInDB;
  setLeftDataSource: React.Dispatch<
    React.SetStateAction<DataSourceInDB | undefined>
  >;
  rightDataSource?: DataSourceInDB;
  setRightDataSource: React.Dispatch<
    React.SetStateAction<DataSourceInDB | undefined>
  >;
  selectedBlendOptions: FieldOptionWithDataSourceId[];
  setSelectedBlendOptions: React.Dispatch<
    React.SetStateAction<FieldOptionWithDataSourceId[]>
  >;
}

const optionStyle = {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left center",
  backgroundSize: "contain",
  paddingLeft: "25px", // Add extra padding to the left if there's an image
  marginRight: "5px",
  marginBottom: "5px",
};

export const Blender: React.FC<BlenderProps> = ({
  fieldOptions,
  dataSources,
  selectedDataSource,
  dropDownOptions,
  selectedOption,
  leftDataSource,
  setLeftDataSource,
  rightDataSource,
  setRightDataSource,
  selectedBlendOptions,
  setSelectedBlendOptions,
}) => {
  const [leftFieldOptions, setLeftFieldOptions] = useState<
    FieldOptionWithDataSourceId[]
  >([]);
  const [rightFieldOptions, setRightFieldOptions] = useState<
    FieldOptionWithDataSourceId[]
  >([]);

  const [defaultRightDropDownOption, setDefaultRightDropDownOption] =
    useState<DropDownOption>();

  const getIconUrl = (imgPath: string) => {
    return require(`../Static/images/${imgPath}.png`);
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    left: boolean
  ) => {
    const selectedValue = event.target.value;
    if (leftDataSource && rightDataSource) {
      if (left === true) {
        const selectedOption = leftFieldOptions?.find(
          (option) => option.value === selectedValue
        );
        setLeftFieldOptions(
          leftFieldOptions?.filter((option) => option.value !== selectedValue)
        );

        if (selectedOption) {
          const optionWithDataSourceId: FieldOptionWithDataSourceId = {
            ...selectedOption,
            data_source_id: leftDataSource?.id,
          };
          setSelectedBlendOptions([
            ...selectedBlendOptions,
            optionWithDataSourceId,
          ]);
        }
      } else {
        const selectedOption = rightFieldOptions?.find(
          (option) => option.value === selectedValue
        );
        setRightFieldOptions(
          rightFieldOptions?.filter((option) => option.value !== selectedValue)
        );
        if (selectedOption) {
          const optionWithDataSourceId: FieldOptionWithDataSourceId = {
            ...selectedOption,
            data_source_id: rightDataSource?.id,
          };
          setSelectedBlendOptions([
            ...selectedBlendOptions,
            optionWithDataSourceId,
          ]);
        }
      }
    }
  };

  const handleRemove = (option: FieldOptionWithDataSourceId) => {
    setSelectedBlendOptions(
      selectedBlendOptions.filter((o) => o.value !== option.value)
    );

    if (option.data_source_id === leftDataSource?.id) {
      setLeftFieldOptions((leftOptions) => {
        const options = [...leftOptions, option];
        const sortedOptions = options.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        const index = sortedOptions.indexOf(option);
        if (
          index !== -1 &&
          index < sortedOptions.length - 1 &&
          sortedOptions[index + 1].label === option.label
        ) {
          return leftOptions;
        }
        return sortedOptions;
      });
    } else {
      setRightFieldOptions((rightOptions) => {
        const options = [...rightOptions, option];
        const sortedOptions = options.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        const index = sortedOptions.indexOf(option);
        if (
          index !== -1 &&
          index < sortedOptions.length - 1 &&
          sortedOptions[index + 1].label === option.label
        ) {
          return rightOptions;
        }
        return sortedOptions;
      });
    }
  };

  const handleSelectLeftDataSource = (selectedOption: DropDownOption) => {
    const dataSource = dataSources.find(
      (dataSource) => dataSource.id.toString() === selectedOption?.id
    );
    setLeftDataSource(dataSource);
    if (dataSource) {
      DefaultService.dataSourceFieldOptionsQueryDataSourceFieldOptionsPost(
        dataSource
      ).then((response) => {
        let leftOptions = response.map((option) => {
          const optionWithDataSourceId: FieldOptionWithDataSourceId = {
            ...option,
            data_source_id: dataSource?.id,
          };
          return optionWithDataSourceId;
        });
        setLeftFieldOptions(leftOptions);
      });
    }
  };

  const handleSelectRightDataSource = (selectedOption: DropDownOption) => {
    const dataSource = dataSources.find(
      (dataSource) => dataSource.id.toString() === selectedOption.id
    );
    setRightDataSource(dataSource);
    if (dataSource) {
      DefaultService.dataSourceFieldOptionsQueryDataSourceFieldOptionsPost(
        dataSource
      ).then((response) => {
        let rightOptions = response.map((option) => {
          const optionWithDataSourceId: FieldOptionWithDataSourceId = {
            ...option,
            data_source_id: dataSource?.id,
          };
          return optionWithDataSourceId;
        });
        setRightFieldOptions(rightOptions);
      });
    }
  };

  useEffect(() => {
    if (rightDataSource) {
      DefaultService.dataSourceFieldOptionsQueryDataSourceFieldOptionsPost(
        rightDataSource
      ).then((response) => {
        let rightOptions = response.map((option) => {
          const optionWithDataSourceId: FieldOptionWithDataSourceId = {
            ...option,
            data_source_id: rightDataSource?.id,
          };
          return optionWithDataSourceId;
        });
        setRightFieldOptions(rightOptions);
      });
    }
  }, [rightDataSource]);

  useEffect(() => {
    let leftOptions = fieldOptions.map((option) => {
      const optionWithDataSourceId: FieldOptionWithDataSourceId = {
        ...option,
        data_source_id: selectedDataSource?.id,
      };
      return optionWithDataSourceId;
    });
    setLeftFieldOptions(leftOptions);
    setLeftDataSource(selectedDataSource);
  }, []);

  useEffect(() => {
    const option = dropDownOptions.find(
      (option) => option.id === rightDataSource?.id.toString()
    );
    setDefaultRightDropDownOption(option);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <Dropdown
          options={dropDownOptions.filter(
            (option) => option.id !== defaultRightDropDownOption?.id
          )}
          onSelectOption={handleSelectLeftDataSource}
          defaultOption={selectedOption}
        ></Dropdown>
        <select
          multiple
          size={10}
          className="block w-full h-80 bg-white border border-gray-400 shadow-sm py-2 px-4 mt-0 rounded-md text-left cursor-pointer focus:outline-none"
          onChange={(e) => handleSelect(e, true)}
        >
          {leftFieldOptions && (
            <>
              {leftFieldOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{
                    ...optionStyle,
                    backgroundImage: option.img
                      ? `url(${getIconUrl(option.img)})`
                      : undefined,
                  }}
                >
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className="col-span-1">
        <Dropdown
          options={dropDownOptions.filter(
            (option) => option.id !== selectedOption?.id
          )}
          onSelectOption={handleSelectRightDataSource}
          defaultOption={defaultRightDropDownOption}
        ></Dropdown>
        <select
          multiple
          size={10}
          className="block w-full h-80 bg-white border border-gray-400 shadow-sm py-2 px-4 mt-0 rounded-md text-left cursor-pointer focus:outline-none"
          onChange={(e) => handleSelect(e, false)}
        >
          {rightFieldOptions && (
            <>
              {rightFieldOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{
                    ...optionStyle,
                    backgroundImage: option.img
                      ? `url(${getIconUrl(option.img)})`
                      : undefined,
                  }}
                >
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className="col-span-1">
        <h1 className="text-2xl font-bold mb-8">Blend</h1>
        <ul
          className="border border-gray-400 bg-white rounded-md p-4 h-80 max-h-80 overflow-y-auto"
          // placeholder="selected fields"
        >
          {selectedBlendOptions.map((option) => (
            <li
              key={option.value}
              className="flex items-center justify-between py-1"
            >
              <div className="flex items-center">
                {option.img && (
                  <img
                    src={getIconUrl(option.img)}
                    className="w-6 h-6 mr-2 flex-shrink-0"
                  />
                )}
                <span>{option.label}</span>
              </div>
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
    </div>
  );
};
