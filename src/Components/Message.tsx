import React, { useEffect, useState } from "react";
import { Chart } from "./ChartComponent";
import { ChartSelector } from "./ChartSelector";
import { LoadingMessage } from "./LoadingMessage";
import { StickyHeadTable } from "./Table";
import { CSVLink } from "react-csv";

export interface MessageProps {
  index: number;
  isUserMessage: boolean;
  text?: string;
  data?: any;
  columns?: string[];
  chartType?: string;
  loading?: boolean;
  tableName?: any;
  clearMessages?: () => void;
}

export const Message: React.FC<MessageProps> = ({
  index,
  isUserMessage,
  text,
  data,
  columns,
  chartType,
  loading,
  tableName,
  clearMessages,
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
              {text ? (
                <div
                  className={`bg-teal-500 rounded-lg p-2 max-w-md ${
                    isUserMessage
                      ? "bg-gray-500 text-white"
                      : "bg-teal-500 text-white"
                  }`}
                >
                  <p className="text-sm">{text}</p>
                </div>
              ) : null}
            </div>

            {columns && data && data.length > 0 && (
              <>
                {/* <ChartSelector
                  chartOption={chartOption}
                  setChartOption={setChartOption}
                  isOpen={chartSelectOpen || false}
                  setIsOpen={setChartSelectOpen}
                /> */}
                <StickyHeadTable columns={columns} results={data} />
                <button className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mt-5 mr-2">
                  <CSVLink data={data} filename={`${tableName}.csv`}>
                    Export CSV
                  </CSVLink>
                </button>
                <button
                  onClick={clearMessages}
                  className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mt-5 mr-2"
                >
                  Ask a new question
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
