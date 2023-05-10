import React, { useEffect, useState } from "react";
import { Chart } from "./ChartComponent";
import { ChartSelector } from "./ChartSelector";

export interface LoadingMessageProps {
  index: number;
  isUserMessage: boolean;
  text: string;
}

export const LoadingMessage: React.FC<LoadingMessageProps> = ({
  index,
  isUserMessage,
  text,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div
        key={index}
        className={`flex ${
          isUserMessage ? "justify-end" : "justify-start"
        } mt-4`}
      >
        {isUserMessage ? (
          <div className="bg-gray-500 rounded-lg p-2 max-w-md text-white">
            <p className="text-sm">{text}</p>
          </div>
        ) : (
          <div className="bg-teal-500 rounded-lg p-2 max-w-md">
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
              <p className="text-sm ml-2 text-white">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
