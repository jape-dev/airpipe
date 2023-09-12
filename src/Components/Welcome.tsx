import { tourOptions, steps, TourButton } from "../Utils/AskTour";
import { ShepherdTour } from "react-shepherd";
import { ShepherdTourContext } from "react-shepherd";
import React, { useContext } from "react";

export const WelcomeModal = (props: {
  setWelcome: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const tour = useContext(ShepherdTourContext);

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
          Click get started to ask questions using the tutorial data. Then add
          your own data and bring your marketing reporting to the next level 🚀
        </p>
        <div className="flex justify-center">
          <ShepherdTour steps={steps} tourOptions={tourOptions}>
            <TourButton setWelcome={props.setWelcome} />
          </ShepherdTour>
        </div>
      </div>
    </div>
  );
};
