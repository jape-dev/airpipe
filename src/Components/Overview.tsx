import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";

export const Overview = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Welcome to AirPipe
        </h3>
        <p className="mt-1 max-w text-sm leading-5 text-gray-500">
          AirPipe is currently in beta. Have any idea on how to improve it?
          Please get in touch: james@useairpipe.com
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 px-4 sm:px-6">
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            1) Connect
          </h3>

          <p className="mt-2 text-sm leading-5 text-gray-500">
            Get started by securely authenticating and connecting to your
            marketing channels.
          </p>
          <button
            className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate(RouterPath.CONNECT)}
          >
            Connect
          </button>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            2) Manage & Transform
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Create views from your data sources. Blend together data sources and
            segment data.
          </p>
          <button
            className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate(RouterPath.CREATE_VIEW)}
          >
            Manage
          </button>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            3) Share & Analyse
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Share your data to Looker Studio or Google Sheets. Ask ad hoc
            questions using AirPipe's AI.
          </p>
          <button
            className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate(RouterPath.ASK)}
          >
            Ask AI
          </button>
        </div>
      </div>
      {/* <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
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
      </div> */}
    </div>
  );
};
