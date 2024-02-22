import { useState, useEffect } from "react";
import { DatetimeStringToDateString } from "../Utils/DateFormat";
import { DataSourceInDB, ChannelType } from "../vizoApi";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { CreateViewState } from "../Screens/CreateView";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface BaseDataSourceProps {
  dataSource: DataSourceInDB;
  selected: boolean;
  firstSource: boolean;
}

export const BaseDataSource: React.FC<BaseDataSourceProps> = ({
  dataSource,
  selected,
  firstSource = false,
}) => {
  const navigate = useNavigate();

  const getIconUrl = () => {
    return require(`../Static/images/${dataSource.channel_img}.png`);
  };

  const handleCreateViewClick = () => {
    const state: CreateViewState = {
      dataSource: dataSource,
    };
    navigate(RouterPath.CREATE_VIEW, {
      state: state,
    });
  };

  const getChannelNameFromEnum = () => {
    if (
      dataSource.channel === ChannelType.GOOGLE ||
      dataSource.channel === ChannelType.GOOGLE_VIDEO
    ) {
      return "Google Ads";
    } else if (dataSource.channel === ChannelType.FACEBOOK) {
      return "Facebook Ads";
    } else if (dataSource.channel === ChannelType.GOOGLE_ANALYTICS) {
      return "Google Analytics";
    } else if (dataSource.channel === ChannelType.YOUTUBE) {
      return "YouTube";
    } else if (
      dataSource.channel === ChannelType.INSTAGRAM_MEDIA ||
      dataSource.channel === ChannelType.INSTAGRAM_ACCOUNT
    ) {
      return "Instagram";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-8 w-8 mr-3" src={getIconUrl()} alt="icon" />
        <h1 className="mr-10">
          <span className="text-lg font-medium">
            {dataSource.ad_account_name
              ? dataSource.ad_account_name
              : getChannelNameFromEnum()}{" "}
            |{" "}
          </span>
          <span className="text-md text-gray-500">
            {dataSource.ad_account_id}
          </span>
        </h1>
      </div>
      <div className="flex flex-col">
        {firstSource && (
          <h2 className="text-sm font-medium text-gray-600 text-center mb-1">
            Date Range
          </h2>
        )}
        <h2 className="text-md text-gray-500">
          {DatetimeStringToDateString(dataSource.start_date)} -{" "}
          {DatetimeStringToDateString(dataSource.end_date)}
        </h2>
      </div>
      <div className="flex flex-col">
        {firstSource && (
          <div className="text-center mb-1">
            <div className="inline-flex items-center justify-center">
              <h2 className="text-sm font-medium text-gray-600">Scan Status</h2>
              <div className="relative group ml-2">
                <InformationCircleIcon className="h-4 w-4 cursor-pointer" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-60 mb-4 hidden group-hover:block bg-gray-50 text-black text-sm rounded-md shadow-lg p-4">
                  <p className="mb-2">
                    AirPipe scans data sources to gather metadata that helps our
                    AI model understand and answer marketing questions.
                  </p>
                  <p>Once complete, you'll see this data source in Ask AI.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {dataSource.dh_connection_id ? (
          <h2 className="text-md text-gray-500">Scan Complete</h2>
        ) : (
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 border-t-transparent border-solid animate-spin rounded-full border-teal-500 border-4 mr-1"></div>
            <h2 className="text-md text-gray-500">Scanning</h2>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleCreateViewClick}
        >
          {selected ? "Back" : "Create View"}
        </button>
      </div>
    </div>
  );
};
