import React, { useState } from "react";

export const Overview = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Overview
        </h3>
        <p className="mt-1 max-w text-sm leading-5 text-gray-500">
          AirPipe lets you import data from a variety of sources, transform it
          without using any code, and export it to a variety of destinations.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 px-4 sm:px-6">
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            Import
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Get started by connecting to your data sources and selecting which
            data points you want to import.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            Transform
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Use natural language prompts to describe how you want to combine,
            slice and dice your data. Our GPT powered AI will convert your
            prompt into SQL for you, which you can also edit as you wish. You
            can chain multiple prompts together to create a pipeline.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            Export
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Once you are happy with your data, export it as a csv file which you
            can then use to load into your destination of choice.
          </p>
        </div>
      </div>
      <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleCollapse}
        >
          <h3 className="text-lg leading-6 mb-2 font-medium text-gray-900">
            Tutorial
          </h3>
          <svg
            className={`h-4 w-4 transform transition-transform ${
              isCollapsed ? "" : "rotate-180"
            } text-gray-500`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {!isCollapsed && (
          <div className="aspect-w-12 aspect-h-6">
            <div
              style={{
                position: "relative",
                paddingBottom: "64.98194945848375%",
                height: 0,
              }}
            >
              <iframe
                src="https://www.loom.com/embed/4afb42fc53544aa5a76dfca8d6d930a3"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
