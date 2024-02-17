import { useState, useEffect } from "react";
import { DatetimeStringToDateString } from "../Utils/DateFormat";
import { ViewInDB, ChannelType } from "../vizoApi";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface BaseViewProps {
  view: ViewInDB;
  setSelectedView: React.Dispatch<React.SetStateAction<ViewInDB | undefined>>;
  selected: boolean;
  hanldeChartClick: () => void;
  firstSource: boolean;
}

export const BaseView: React.FC<BaseViewProps> = ({
  view,
  setSelectedView,
  selected,
  hanldeChartClick,
  firstSource = false,
}) => {
  const handleViewClick = () => {
    if (selected === true) {
      setSelectedView(undefined);
    } else {
      setSelectedView(view);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* <img className="h-8 w-8 mr-4" src={getIconUrl()} alt="icon" /> */}
        <h1 className="mr-10">
          <span className="text-lg font-medium">{view.name}</span>
        </h1>
      </div>
      <div className="flex flex-col">
        {firstSource && (
          <h2 className="text-sm font-medium text-gray-600 text-center mb-1">
            Date Range
          </h2>
        )}
        <h2 className="text-md text-gray-500">
          {view.start_date && view.end_date
            ? `${DatetimeStringToDateString(
                view.start_date
              )} - ${DatetimeStringToDateString(view.end_date)}`
            : "-"}
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
                    AirPipe scans views to gather metadata that helps our AI
                    model understand and answer questions.
                  </p>
                  <p>Once complete, you'll see this view in Ask AI.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {view.dh_connection_id ? (
          <h2 className="text-md text-gray-500">Scan Complete</h2>
        ) : (
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 border-t-transparent border-solid animate-spin rounded-full border-teal-500 border-4 mr-1"></div>
            <h2 className="text-md text-gray-500">Scanning</h2>
          </div>
        )}
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
