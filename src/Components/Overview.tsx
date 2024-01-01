import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { DefaultService, User } from "../vizoApi";
import { GoogleConnectorV2 } from "../Components/GoogleConnectorV2";
import { GoogleAnalyticsConnector } from "../Components/GoogleAnalyticsConnector";
import { FacebookConnectorV2 } from "../Components/FacebookConnectorV2";
import { ChatInterfaceProps } from "./ChatInterface";

interface OverviewProps {
  currentUser?: User;
}

export const Overview: React.FC<OverviewProps> = ({ currentUser }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const gifs = [
    require("../Static/images/connect.gif"),
    require("../Static/images/manage.gif"),
    require("../Static/images/ask.gif"),
  ];

  const handleMouseEnter = (step: number) => {
    setStep(step);
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Welcome to AirPipe
        </h3>
        <p className="mt-1 max-w text-sm leading-5 text-gray-500">
          AirPipe is currently in beta. Have any ideas on how to improve it?
          Please get in touch: james@useairpipe.com
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 px-4 sm:px-6">
        <div
          className={`bg-gray-100 rounded-lg px-4 py-5 ${
            step === 0 && "border-2 border-teal-500 shadow-sm"
          }`}
          onMouseEnter={() => handleMouseEnter(0)}
        >
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
        <div
          className={`bg-gray-100 rounded-lg px-4 py-5 ${
            step === 1 && "border-2 border-teal-500"
          }`}
          onMouseEnter={() => handleMouseEnter(1)}
        >
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
        <div
          className={`bg-gray-100 rounded-lg px-4 py-5 ${
            step === 2 && "border-2 border-teal-500"
          }`}
          onMouseEnter={() => handleMouseEnter(2)}
        >
          <h3 className="text-md leading-6 font-medium text-gray-900">
            3) Share & Analyse
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Share your data to Looker Studio or Google Sheets. Get answers to ad
            hoc questions using AirPipe's AI.
          </p>
          <button
            className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate(RouterPath.ASK)}
          >
            Ask AI
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 px-4 sm:px-6">
        <div className="col-span-2 col-mt-5 bg-gray-100 rounded-lg border-2 border-gray-200 h-[500px]">
          {" "}
          <img
            src={gifs[step]}
            alt="Step Illustration"
            className="w-full h-fullin rounded-lg"
          />
        </div>
        <div className="col-span-1 col-mt-5 bg-gray-100 rounded-lg border-2 border-gray-200 p-5">
          <h1 className="text-2xl font-bold mb-5">Connectors</h1>
          <p className="mb-12 mt-0text-sm leading-5 text-gray-500">
            Get started by securely authenticating and connecting to your
            marketing channels.
          </p>
          <GoogleConnectorV2 currentUser={currentUser} />
          <FacebookConnectorV2 currentUser={currentUser} />
          <GoogleAnalyticsConnector currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};
