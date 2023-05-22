import { useState } from "react";

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
          AirPipe lets you import data from a variety of sources and ask
          questions like a marketer.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 py-5 px-4 sm:px-6">
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            1) Connect
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Get started by securely authenticating and connecting to your
            marketing channels.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            2) Add data
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Select your ad account and choose the fields you want to import.
            Create as many data sources as you need.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            3) Data sources
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            View your data sources and export them to a variety of destinations.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            4) Ask
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Use plain english to ask questions about your data. Our GPT powered
            AI will get the results to answer your question, and let you
            visualise them using a chart of your choice.
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
                src="https://www.loom.com/embed/8f41ac2f51c14a1cb67dc6878db27a1f"
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
