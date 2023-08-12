import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";

export const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(RouterPath.ASK);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow overflow-hidden rounded-lg w-1/2 px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">
          Thanks for signing up for AirPipe and welcome to the Free Beta!
        </h3>
        <p className="max-w text-sm leading-5 text-gray-500 text-center mb-4">
          I am excited to have you on board and look forward to helping you
          streamline your marketing reporting.
        </p>
        <p className="max-w text-sm leading-5 text-gray-500 text-center mb-4">
          If you have any questions or need any assistance with getting started,
          please don't hesitate to reach out to me on james@useairpipe.com.
        </p>
        <p className="max-w text-sm leading-5 text-gray-500 text-center mb-4">
          I am always here to help. Thank you again for choosing AirPipe!
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleGetStarted}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
