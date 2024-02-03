import { useState, useEffect } from "react";
import { DatetimeStringToDateString } from "../Utils/DateFormat";
import { DataSourceInDB, ChannelType } from "../vizoApi";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { CreateViewState } from "../Screens/CreateView";

interface BaseDataSourceProps {
  dataSource: DataSourceInDB;
  setSelectedDataSource: React.Dispatch<
    React.SetStateAction<DataSourceInDB | undefined>
  >;
  selected: boolean;
  firstSource: boolean;
}

export const BaseDataSource: React.FC<BaseDataSourceProps> = ({
  dataSource,
  setSelectedDataSource,
  selected,
  firstSource = false,
}) => {
  const [channelName, setChannelName] = useState<string>("");
  const navigate = useNavigate();

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

  const handleCreateViewClick = () => {
    const state: CreateViewState = {
      dataSource: dataSource,
    };
    navigate(RouterPath.CREATE_VIEW, {
      state: state,
    });
  };

  useEffect(() => {
    if (dataSource.channel === ChannelType.GOOGLE) {
      setChannelName("Google Ads");
    } else if (dataSource.channel === ChannelType.FACEBOOK) {
      setChannelName("Facebook Ads");
    } else if (dataSource.channel === ChannelType.GOOGLE_ANALYTICS) {
      setChannelName("Google Analytics");
    }
  }, []);

  const getChannelNameFromEnum = () => {
    if (dataSource.channel === ChannelType.GOOGLE) {
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
        <img className="h-8 w-8 mr-4" src={getIconUrl()} alt="icon" />
        <h1 className="mr-10">
          <span className="text-lg font-medium">
            {getChannelNameFromEnum()} |{" "}
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
