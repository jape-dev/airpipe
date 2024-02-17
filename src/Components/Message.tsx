import React, { useEffect, useState } from "react";
import { Chart } from "./ChartComponent";
import { LoadingMessage } from "./LoadingMessage";
import { StickyHeadTable } from "./Table";
import { RouterPath } from "../App";
import { useNavigate } from "react-router-dom";
import { CreateChartState } from "../Screens/CreateChart";
import {
  View,
  ViewInDB,
  DefaultService,
  CurrentResults,
  User,
  DataSourceInDB,
  FieldOption,
  Body_field_options_query_field_options_post,
} from "../vizoApi";

import { CustomModal } from "./CustomModal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import {
  InformationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

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
  currentUser?: User;
  userToken?: string;
  dataSource?: DataSourceInDB;
  question?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  index,
  isUserMessage,
  text,
  data,
  columns,
  loading,
  tableName,
  clearMessages,
  clickable,
  clickAction,
  sql,
  confidenceScore,
  currentUser,
  userToken,
  dataSource,
  question,
}) => {
  const [showCode, setShowCode] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  // initialize with a random
  const [viewName, setViewName] = useState<string>(uuidv4());
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldOption[]>([]);

  let navigate = useNavigate();

  const handleViewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setViewName(event.target.value);
  };

  useEffect(() => {
    if (columns && data) {
      let requestBody: Body_field_options_query_field_options_post = {
        fields: columns,
        data: data,
      };
      DefaultService.fieldOptionsQueryFieldOptionsPost(requestBody)
        .then((response) => {
          setFields(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [columns]);

  const saveView = () => {
    let view: View = {
      name: viewName,
      fields: fields,
      start_date: dataSource?.start_date ? dataSource?.start_date : undefined,
      end_date: dataSource?.end_date ? dataSource?.end_date : undefined,
    };
    if (currentUser && userToken) {
      const viewDB = DefaultService.saveViewQuerySaveViewPost(userToken, view)
        .then((response: ViewInDB) => {
          setModal(false);
          setIsLoading(false);
          let results: CurrentResults = {
            columns: columns ? columns : [],
            results: data,
            name: response.name,
          };
          DefaultService.saveTableQuerySaveTablePost(
            userToken,
            response.db_schema,
            results
          ).then(() => {
            DefaultService.connectDbQueryDataheraldConnectDbPost(
              response.id,
              response.db_schema,
              false,
              false
            ).catch((error) => {
              console.log(error);
            });
            navigate(RouterPath.VIEWS);
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Could not save view. Please try again");
          setIsLoading(false);
        });
      return viewDB;
    }
  };

  const routeChangeCreateChart = () => {
    // pass data into create chart
    let results: CurrentResults = {
      columns: columns ? columns : [],
      results: data,
      name: question ? question : "Add a title",
    };
    navigate(RouterPath.CREATE_CHART, {
      state: {
        results: results,
      },
    });
  };

  const confidenceBackgroundColour = (confidenceScore: number | undefined) => {
    if (!confidenceScore) {
      return "bg-grey-200";
    }
    if (confidenceScore > 0.8) {
      return "bg-green-400";
    } else if (confidenceScore > 0.6) {
      return "bg-green-200";
    } else if (confidenceScore > 0.5) {
      return "bg-yellow-200";
    } else {
      return "bg-red-200";
    }
  };

  const copyToClickBoard = () => {
    navigator.clipboard.writeText(sql ? sql : "");
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
                  className={`bg-teal-500  rounded-lg p-2 max-w-md ${
                    isUserMessage
                      ? "bg-transparent border-2 "
                      : clickable
                      ? "bg-transparent border hover:bg-teal-700 text-teal-500 hover:bg-teal-500 hover:text-white"
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
                    <div className="inline-flex items-center bg-transparent border border-gray-200 rounded-xl p-2 mt-3 mr-2 shadow-sm">
                      <div className="flex items-center bg-gray-300 rounded-l-xl py-2 relative">
                        <p className="pl-4 mr-2">Confidence</p>
                        <div className="group">
                          <InformationCircleIcon className="inline h-4 w-4 mr-2 mb-1" />
                          <div className="absolute bottom-full w-60 mb-4 hidden group-hover:block bg-gray-50 text-black text-sm rounded-md shadow-lg p-4">
                            <p className="mb-2">
                              The confidence score is how likely the result is
                              to be accurate.
                            </p>
                            <p>
                              It is based on the question asked and the
                              complexity of the generated query.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex items-center rounded-r-xl py-2 ${confidenceBackgroundColour(
                          confidenceScore
                        )}`}
                      >
                        <p className="text-white px-4">
                          {confidenceScore ? confidenceScore * 100 : 0}%
                        </p>
                      </div>
                      <button
                        onClick={() => setShowCode(!showCode)}
                        className="inline-flex px-2 py-2 ml-2"
                      >
                        Show Code
                        <ChevronDownIcon
                          className={`inline w-4 h-4 ml-2 mt-1 transform ${
                            showCode ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="inline-block bg-transparent border border-gray-300 rounded-xl p-2 mt-3 shadow-sm">
                      <button
                        onClick={clearMessages}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-xl mr-2"
                      >
                        Ask a new question
                      </button>
                      <button
                        onClick={() => setModal(true)}
                        className="bg-teal-500 hover:bg-teal-700  text-white font-medium py-2 px-4 rounded-xl mr-2"
                      >
                        Save as view
                      </button>
                      <button
                        onClick={() => routeChangeCreateChart()}
                        className="bg-teal-500 hover:bg-teal-700  text-white font-medium py-2 px-4 rounded-xl mr-2"
                      >
                        Create chart
                      </button>
                      {/* <ChartSelector
                        chartOption={chartOption}
                        setChartOption={setChartOption}
                        isOpen={chartSelectOpen || false}
                        setIsOpen={setChartSelectOpen}
                      /> */}
                    </div>
                    {showCode && sql && (
                      <div className="inline-block mt-3 shadow-sm">
                        <div className="bg-gray-900 text-white p-4 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">SQL:</span>
                            <button
                              onClick={copyToClickBoard}
                              className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
                              data-clipboard-target="#code"
                            >
                              Copy
                            </button>
                          </div>
                          <div className="overflow-x-auto">
                            <pre
                              id="code"
                              className="text-gray-300 overflow-auto whitespace-pre-wrap break-words"
                            >
                              <code>{sql}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={clearMessages}
                      className="bg-teal-500 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl mt-5 mr-2"
                    >
                      Ask a new question
                    </button>
                  </>
                )}
              </>
            )}
            {/* {chartOption && data && chartSelectOpen === false && (
              // <div key={index} className="flex justify-start mt-4 mr-0">
              //   <Chart data={data} chartType={chartOption} />
              // </div>
            )} */}
          </div>
          <CustomModal
            parentshow={modal}
            setParentShow={setModal}
            style={{ minWidth: "400px", minHeight: "300px" }}
          >
            <>
              <button
                className="ml-2 p-1 rounded-md text-gray-500 hover:text-gray-700 absolute top-0 right-0"
                onClick={() => setModal(false)}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
              <h2 className="font-bold text-lg">Enter a view name</h2>
              <input
                type="text"
                onChange={handleViewNameChange}
                placeholder={"View name"}
                className="block w-full bg-white border border-gray-400 shadow-sm h-10 mt-4 mb-2 py-2 px-4 rounded-md text-left focus:outline-none"
              />
              <button
                onClick={saveView} // Call the new handleSubmit function
                className="bg-teal-500 text-white rounded-md px-4 py-2 h-12 w-30 flex items-center justify-center mt-4 mx-auto"
                disabled={isLoading} // Disable the button when loading
              >
                {isLoading ? ( // Render loading animation if isLoading is true
                  <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                ) : (
                  <>
                    <PlusCircleIcon className="inline h-6 w-6 mr-2" />
                    <span className="text-md">Create View</span>
                  </>
                )}
              </button>
            </>
          </CustomModal>
        </div>
      )}
    </>
  );
};
