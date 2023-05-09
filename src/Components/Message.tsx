import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { DefaultService, Prompt, ChainResult } from "../vizoApi";
import { Chart } from "./ChartComponent";
import { ChartSelector } from "./ChartSelector";

export interface MessageProps {
  index: number;
  isUserMessage: boolean;
  text: string;
  data?: any;
  chartType?: string;
}

export const Message: React.FC<MessageProps> = ({
  index,
  isUserMessage,
  text,
  data,
  chartType,
}) => {
  const [chartOption, setChartOption] = useState<string>("");
  const [chartSelectOpen, setChartSelectOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto">
        <div
          key={index}
          className={`flex ${
            isUserMessage ? "justify-end" : "justify-start"
          } mt-4`}
        >
          <div
            className={`bg-teal-500 rounded-lg p-2 max-w-md ${
              isUserMessage
                ? "bg-gray-500 text-white"
                : "bg-teal-500 text-white"
            }`}
          >
            <p className="text-sm">{text}</p>
          </div>
        </div>

        {data && data.length > 0 && (
          <ChartSelector
            chartOption={chartOption}
            setChartOption={setChartOption}
            isOpen={chartSelectOpen || false}
            setIsOpen={setChartSelectOpen}
          />
        )}
        {chartType && data && chartSelectOpen === false && (
          <div key={index} className="flex justify-start mt-4">
            <Chart data={data} chartType={chartType} />
          </div>
        )}
      </div>
    </div>
  );
};
