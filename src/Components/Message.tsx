import React, { useEffect, useState } from "react";
import { Chart } from "./ChartComponent";
import { LoadingMessage } from "./LoadingMessage";
import { StickyHeadTable } from "./Table";
import { CSVLink } from "react-csv";
import { RouterPath } from "../App";
import { useNavigate } from "react-router-dom";
import { ChartSelector } from "./ChartSelector";

export interface ChatMessageProps {
  index: number;
  isUserMessage: boolean;
  text?: string;
  data?: any;
  columns?: string[];
  chartType?: string;
  loading?: boolean;
  tableName?: any;
  clearMessages?: () => void;
  clickable?: boolean;
  clickAction?: (text: string) => void;
  sql?: string;
  confidenceScore?: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  index,
  isUserMessage,
  text,
  data,
  columns,
  chartType,
  loading,
  tableName,
  clearMessages,
  clickable,
  clickAction,
}) => {
  const [chartOption, setChartOption] = useState<string>("");
  const [chartSelectOpen, setChartSelectOpen] = useState<boolean>(false);
  let navigate = useNavigate();
  const routeChange = () => {
    navigate(RouterPath.CONNECT);
  };

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
                      : clickable
                      ? "bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
                      : "bg-teal-500 text-white"
                  }`}
                >
                  {clickable && clickAction ? (
                    <button
                      className="text-sm text-left"
                      onClick={() => clickAction(text)}
                    >
                      {text}
                    </button>
                  ) : (
                    <p className="text-sm text-left">{text}</p>
                  )}
                </div>
              ) : null}
            </div>

            {columns && data && data.length > 0 && (
              <>
                <StickyHeadTable columns={columns} results={data} />
                {tableName !== "tutorial_data" ? (
                  <>
                    <button
                      onClick={clearMessages}
                      className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mt-5 mr-2"
                    >
                      Ask a new question
                    </button>
                    {/* <button className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mt-5 mr-2">
                      <CSVLink data={data} filename={`${tableName}.csv`}>
                        Export CSV
                      </CSVLink>
                    </button> */}
                                        <button className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mt-5 mr-2">
                        Save as view
                    </button>
                    <ChartSelector
                      chartOption={chartOption}
                      setChartOption={setChartOption}
                      isOpen={chartSelectOpen || false}
                      setIsOpen={setChartSelectOpen}
                    />

                  </>
                ) : (
                  <>
                    <button
                      onClick={clearMessages}
                      className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mt-5 mr-2"
                    >
                      Ask a new question
                    </button>
                    <button
                      onClick={routeChange}
                      className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mt-5 mr-2"
                    >
                      Add your own data
                    </button>
                  </>
                )}
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
