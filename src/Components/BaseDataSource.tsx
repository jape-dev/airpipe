import { useEffect, useState } from "react";
import { DataSourceInDB } from "../vizoApi";
import { CSVLink } from "react-csv";

interface BaseDataSourceProps {
  dataSource: DataSourceInDB;
  setSelectedDataSource: React.Dispatch<
    React.SetStateAction<DataSourceInDB | undefined>
  >;
  selected: boolean;
  csvData?: Object[];
}

export const BaseDataSource: React.FC<BaseDataSourceProps> = ({
  dataSource,
  setSelectedDataSource,
  selected,
  csvData,
}) => {
  const getIconUrl = () => {
    return require(`../Static/images/${dataSource.channel_img}.png`);
  };

  const handleDataSourceClick = () => {
    if (selected === true) {
      setSelectedDataSource(undefined);
    } else {
      setSelectedDataSource(dataSource);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-8 w-8 mr-4" src={getIconUrl()} alt="icon" />
        <h1 className="text-lg font-medium">{dataSource.name}</h1>
      </div>
      <div className="flex items-center">
        {selected && csvData && (
          <button className="bg-gray-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            <CSVLink data={csvData} filename={`${dataSource.name}.csv`}>
              Export CSV
            </CSVLink>
          </button>
        )}
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleDataSourceClick}
        >
          {selected ? "Back" : "View Data"}
        </button>
      </div>
    </div>
  );
};
