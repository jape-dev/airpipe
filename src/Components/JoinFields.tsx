import React, { useState, useEffect } from "react";
import { CustomModal } from "./CustomModal";
import {
  DefaultService,
  DataSourceInDB,
  FieldOptionWithDataSourceId,
} from "../vizoApi";

interface JoinFieldProps {
  leftDataSource: DataSourceInDB;
  rightDataSource: DataSourceInDB;
  selectedLeftOption?: FieldOptionWithDataSourceId;
  setSelectedLeftOption: React.Dispatch<
    React.SetStateAction<FieldOptionWithDataSourceId | undefined>
  >;
  selectedRightOption?: FieldOptionWithDataSourceId;
  setSelectedRightOption: React.Dispatch<
    React.SetStateAction<FieldOptionWithDataSourceId | undefined>
  >;
  saveJoinCondition: () => void;
}

const optionStyle = {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left center",
  backgroundSize: "contain",
  paddingLeft: "25px", // Add extra padding to the left if there's an image
  marginRight: "5px",
  marginBottom: "5px",
};

const optionSelectedStyle = {
  ...optionStyle, // keep the existing styles
  border: "1px solid rgb(20 184 166)", // add your border color
  borderRadius: "0.25rem", // rounded corners
  backgroundColor: "rgb(20 184 166)",
  // set textcolor to white instead of black
  color: "white",
};

export const JoinFields: React.FC<JoinFieldProps> = ({
  leftDataSource,
  rightDataSource,
  selectedLeftOption,
  setSelectedLeftOption,
  selectedRightOption,
  setSelectedRightOption,
  saveJoinCondition,
}) => {
  const [leftFieldOptions, setLeftFieldOptions] = useState<
    FieldOptionWithDataSourceId[]
  >([]);
  const [rightFieldOptions, setRightFieldOptions] = useState<
    FieldOptionWithDataSourceId[]
  >([]);
  const [modal, setModal] = useState(false);

  const getIconUrl = (imgPath: string) => {
    return require(`../Static/images/${imgPath}.png`);
  };

  const handleLeftSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = leftFieldOptions?.find(
      (option) => option.value === event.target.value
    );
    setSelectedLeftOption(selectedOption);
  };

  const handleRightSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Get option from rightFieldOptions by looking up event.target.value
    const selectedOption = rightFieldOptions?.find(
      (option) => option.value === event.target.value
    );
    setSelectedRightOption(selectedOption);
  };

  useEffect(() => {
    if (rightDataSource) {
      DefaultService.dataSourceFieldOptionsQueryDataSourceFieldOptionsPost(
        rightDataSource
      ).then((response) => {
        let rightOptions = response.map((option) => {
          const optionWithDataSourceId: FieldOptionWithDataSourceId = {
            ...option,
            data_source_id: rightDataSource.id,
          };
          return optionWithDataSourceId;
        });
        setRightFieldOptions(rightOptions);
      });
    }
  }, [rightDataSource]);

  useEffect(() => {
    if (leftDataSource) {
      DefaultService.dataSourceFieldOptionsQueryDataSourceFieldOptionsPost(
        leftDataSource
      ).then((response) => {
        let rightOptions = response.map((option) => {
          const optionWithDataSourceId: FieldOptionWithDataSourceId = {
            ...option,
            data_source_id: leftDataSource.id,
          };
          return optionWithDataSourceId;
        });
        setLeftFieldOptions(rightOptions);
      });
    }
  }, [leftDataSource]);

  return (
    <div className="grid grid-cols-2 gap-4 w-full h-120">
      {/* Heading and subheading */}
      <h2 className="col-span-2 text-xl font-bold">Select Join Fields</h2>
      {/* Subheading */}
      <h3 className="col-span-2 text-lg text-gray-500 font-medium">
        Select a field from each data source that has common values
      </h3>
      <div className="col-span-1">
        <select
          multiple
          size={10}
          className="block w-full h-80 bg-white border border-gray-400 shadow-sm py-2 px-4 mt-0 rounded-md text-left cursor-pointer focus:outline-none"
          onChange={(e) => handleLeftSelect(e)}
        >
          {leftFieldOptions && (
            <>
              {leftFieldOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={
                    selectedLeftOption === option
                      ? {
                          ...optionSelectedStyle,
                          backgroundImage: option.img
                            ? `url(${getIconUrl(option.img)})`
                            : undefined,
                        }
                      : {
                          ...optionStyle,
                          backgroundImage: option.img
                            ? `url(${getIconUrl(option.img)})`
                            : undefined,
                        }
                  }
                >
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className="col-span-1">
        <select
          multiple
          size={10}
          className="block w-full h-80 bg-white border border-gray-400 shadow-sm py-2 px-4 mt-0 rounded-md text-left cursor-pointer focus:outline-none"
          onChange={(e) => handleRightSelect(e)}
        >
          {rightFieldOptions && (
            <>
              {rightFieldOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={
                    selectedRightOption === option
                      ? {
                          ...optionSelectedStyle,
                          backgroundImage: option.img
                            ? `url(${getIconUrl(option.img)})`
                            : undefined,
                        }
                      : {
                          ...optionStyle,
                          backgroundImage: option.img
                            ? `url(${getIconUrl(option.img)})`
                            : undefined,
                        }
                  }
                >
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className="col-span-2 flex justify-center">
        <button
          onClick={() => saveJoinCondition()}
          className="bg-teal-500 hover:bg-teal-600 mt-5 text-white rounded-md px-4 py-2 h-12 w-48 flex items-center justify-center"
        >
          <span className="text-lg">Save blend</span>
        </button>
      </div>
    </div>
  );
};
