import { useState, useEffect } from "react";
import { DatetimeStringToDateString } from "../Utils/DateFormat";
import { ViewInDB, ChannelType } from "../vizoApi";

interface BaseViewProps {
  view: ViewInDB;
  setSelectedView: React.Dispatch<React.SetStateAction<ViewInDB | undefined>>;
  selected: boolean;
  hanldeChartClick: () => void;
}

export const BaseView: React.FC<BaseViewProps> = ({
  view,
  setSelectedView,
  selected,
  hanldeChartClick,
}) => {
  const [channelName, setChannelName] = useState<string>("");

  //   const getIconUrl = () => {
  //     return require(`../Static/images/${dataSource.channel_img}.png`);
  //   };

  const handleViewClick = () => {
    if (selected === true) {
      setSelectedView(undefined);
    } else {
      setSelectedView(view);
    }
  };

  //   useEffect(() => {
  //     if (dataSource.channel === ChannelType.GOOGLE) {
  //       setChannelName("Google Ads");
  //     } else if (dataSource.channel === ChannelType.FACEBOOK) {
  //       setChannelName("Facebook Ads");
  //     } else if (dataSource.channel === ChannelType.GOOGLE_ANALYTICS) {
  //       setChannelName("Google Analytics");
  //     }
  //   }, []);

  //   const getChannelNameFromEnum = () => {
  //     if (dataSource.channel === ChannelType.GOOGLE) {
  //       return "Google Ads";
  //     } else if (dataSource.channel === ChannelType.FACEBOOK) {
  //       return "Facebook Ads";
  //     } else if (dataSource.channel === ChannelType.GOOGLE_ANALYTICS) {
  //       return "Google Analytics";
  //     }
  //   };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* <img className="h-8 w-8 mr-4" src={getIconUrl()} alt="icon" /> */}
        <h1 className="mr-10">
          <span className="text-lg font-medium">{view.name}</span>
        </h1>
      </div>
      <div className="flex items-center">
        <h2 className="text-md text-gray-500">
          {DatetimeStringToDateString(view.start_date)} -{" "}
          {DatetimeStringToDateString(view.end_date)}
        </h2>
      </div>
      <div className="flex items-center">
        {selected && (
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={hanldeChartClick}
          >
            Create chart
          </button>
        )}

        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleViewClick}
        >
          {selected ? "Back" : "View Data"}
        </button>
      </div>
    </div>
  );
};
