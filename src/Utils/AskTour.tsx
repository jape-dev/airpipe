import { ShepherdOptionsWithType, ShepherdTourContext } from "react-shepherd";
import React, { useContext } from "react";
import "shepherd.js/dist/css/shepherd.css";

export const tourOptions = {
  defaultStepOptions: {
    classes:
      "bg-white p-4 w-64 border border-gray-300 shadow-lg rounded-md text-center",
    arrow: false,
  },
  useModalOverlay: true,
};

export const steps: ShepherdOptionsWithType[] = [
  {
    attachTo: { element: "#main-title", on: "left-end" },
    title: "Ask - AI Tutorial",
    text: [
      "AirPipe let's you ask questions about your data in natural language.",
    ],
    buttons: [
      {
        classes:
          "bg-teal-500 text-white rounded-md px-4 py-2 h-8 flex items-center justify-center mt-4 mx-auto",
        text: "Next",
        type: "next",
      },
    ],
  },
  {
    attachTo: { element: "#data-preview", on: "left-end" },
    title: "Data Preview",
    text: [
      "This is the data AirPipe's AI will analyse when you ask questions. We've provided a tutorial dataset for you to test on.",
    ],
    buttons: [
      {
        classes:
          "bg-teal-500 text-white rounded-md px-4 py-2 h-8 flex items-center justify-center mt-4 mx-auto",
        text: "Next",
        type: "next",
      },
    ],
  },
  {
    attachTo: { element: "#chat-interface", on: "left-end" },
    title: "Chat",
    text: [
      'AirPipe can only answer specific questions about the data: ✅ "What month had the highest cost per click?" ❌ "Write me a marketing report for the last 30 days"',
    ],
    buttons: [
      {
        classes:
          "bg-teal-500 text-white rounded-md px-4 py-2 h-8 flex items-center justify-center mt-4 mx-auto",
        text: "Next",
        type: "next",
      },
    ],
  },
  {
    attachTo: { element: "#chat-interface", on: "bottom-start" },
    title: "Ask your first question",
    text: [
      "Add your own question into the text input and press the send button. You can also click on the starter question above to quickly try out an example.",
    ],
    classes:
      "bg-white h-30 w-64 border border-gray-300 shadow-lg rounded-md text-center",
    buttons: [
      {
        classes:
          "bg-teal-500 text-white rounded-md px-4 py-2 h-8 flex items-center justify-center mt-4 mx-auto",
        text: "Next",
        type: "next",
      },
    ],
  },
  {
    attachTo: { element: "#add-data-button", on: "left-end" },
    title: "Add your data",
    text: [
      "Once you've explored the tutorial data, connect to your own marketing channels to add your own data.",
    ],
    buttons: [
      {
        classes:
          "bg-teal-500 text-white rounded-md px-4 py-2 h-8 flex items-center justify-center mt-4 mx-auto",
        text: "Finish",
        type: "next",
      },
    ],
  },
];

export const TourButton = (props: {
  setWelcome: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const tour = useContext(ShepherdTourContext);

  const handleClick = () => {
    if (tour === null) return;
    tour.start();
    props.setWelcome(false);
  };

  return (
    <button
      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      Start Tour
    </button>
  );
};
