import React, { useEffect, useState } from "react";
import { Chart } from "./ChartComponent";
import { ChartSelector } from "./ChartSelector";
import { LoadingMessage } from "./LoadingMessage";
import { StickyHeadTable } from "./Table";
import { CSVLink } from "react-csv";

export interface MessageProps {
  index: number;
  isUserMessage: boolean;
  text: string;
  data?: any;
  columns?: string[];
  chartType?: string;
  loading?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  index,
  isUserMessage,
  text,
  data,
  columns,
  chartType,
  loading,
}) => {
  const [chartOption, setChartOption] = useState<string>("");
  const [chartSelectOpen, setChartSelectOpen] = useState<boolean>(false);

  return (
    <>
      {loading ? (
        <LoadingMessage
          index={index}
          isUserMessage={isUserMessage}
          text={text}
        />
      ) : (
        <div className="flex flex-col h-full w-full">
          <div className="h-full">
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

            {columns && data && data.length > 0 && (
              <>
                <ChartSelector
                  chartOption={chartOption}
                  setChartOption={setChartOption}
                  isOpen={chartSelectOpen || false}
                  setIsOpen={setChartSelectOpen}
                />
                <StickyHeadTable columns={columns} results={data} />
                <button className="bg-gray-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-xl mt-5">
                  <CSVLink data={data} filename={`test.csv`}>
                    Export CSV
                  </CSVLink>
                </button>
              </>
            )}
            {chartOption && data && chartSelectOpen === false && (
              <div key={index} className="flex justify-start mt-4 mr-0">
                <Chart data={data} chartType={chartOption} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
