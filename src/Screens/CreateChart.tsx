import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SideBar } from "../Components/SideBarV2";
import { NavBar } from "../Components/NavBar";
import {
  User,
  UserWithId,
  DefaultService,
  Table,
  ViewInDB,
  CurrentResults,
  FieldOption,
  FieldType,
  CaptionData,
  ChartData,
  Body_field_options_query_field_options_post,
} from "../vizoApi";
import { RouterPath } from "../App";
import {
  TableCellsIcon,
  PaintBrushIcon,
  ChartBarIcon,
  ChartPieIcon,
  FunnelIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { StickyHeadTable } from "../Components/Table";
import { DropDownOption } from "../Components/DropDown";
import { Chart } from "../Components/ChartComponent";
import { ChartConfig } from "../Components/ChartConfig";
import { ChartStyle } from "../Components/ChartStyle";
import { hexWithMoreTransparency } from "../Utils/color";
import { SparklesIcon, ShareIcon } from "@heroicons/react/20/solid";
import { v4 as uuidv4 } from "uuid";

export interface CreateChartState {
  table?: Table;
  view?: ViewInDB;
  results?: CurrentResults;
}

export const CreateChart = () => {
  const state = useLocation().state as CreateChartState;
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User>();
  const [token, setToken] = useState<string>("");
  const [menuStep, setMenuStep] = useState(1);
  const [chartId, setChartId] = useState<string>(uuidv4());
  const [chartStep, setChartStep] = useState(0);
  const [fieldsOptions, setFieldOptions] = useState<FieldOption[]>([]);
  const [metricOptions, setMetricOptions] = useState<FieldOption[]>([]);
  const [dimensionOptions, setDimensionOptions] = useState<FieldOption[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<FieldOption>();
  const [selectedDimension, setSelectedDimension] = useState<FieldOption>();
  const [sortBy, setSortBy] = useState<FieldOption>();
  const [ascending, setAscending] = useState<boolean>(false);
  const [chartType, setChartType] = useState<string>("bar");
  const [limit, setLimit] = useState<number>(5);
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [styleOptions, setStyleOptions] = useState<string[]>(["Bar"]);
  const [primaryColor, setPrimaryColor] = useState<string>("#47d8b4");
  const [secondaryColor, setSecondaryColor] = useState<string>(
    hexWithMoreTransparency("#47d8b4", 0.3)
  );
  const [sliceColors, setSliceColors] = useState<string[]>([
    "#47d8b4", // 100% opacity
    "#47d8b495", // 95% opacity
    "#47d8b48A", // 90% opacity
    "#47d8b47F", // 85% opacity
    "#47d8b475", // 80% opacity
    "#47d8b46A", // 75% opacity
    "#47d8b45F", // 70% opacity
    "#47d8b454", // 65% opacity
    "#47d8b44A", // 60% opacity
    "#47d8b43F", // 55% opacity
    "#47d8b434", // 50% opacity
    "#47d8b42F", // 45% opacity
    "#47d8b424", // 40% opacity
    "#47d8b419", // 35% opacity
    "#47d8b40E", // 30% opacity
  ]);
  const [title, setTitle] = useState<string>("Add a title");
  const [caption, setCaption] = useState<string>("Add caption");
  const [embedUrl, setEmbedUrl] = useState<string>("");

  useEffect(() => {
    let fields: string[] = [];
    let data: { [key: string]: any }[] = [];
    if (state.results?.columns && state.results?.results) {
      fields = state.results?.columns;
      data = state.results?.results;
    }
    let requestBody: Body_field_options_query_field_options_post = {
      fields: fields,
      data: data,
    };
    DefaultService.fieldOptionsQueryFieldOptionsPost(requestBody)
      .then((response: FieldOption[]) => {
        setFieldOptions(response);
        // filter on metrics
        const metrics = response.filter(
          (field) => field.type === FieldType.METRIC
        );
        setMetricOptions(metrics);
        setSelectedMetric(metrics[0]);
        setSortBy(metrics[0]);
        // filter on dimensions
        const dimensions = response.filter(
          (field) => field.type === FieldType.DIMENSION
        );
        setDimensionOptions(dimensions);
        setSelectedDimension(dimensions[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      setToken(token);
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (chartStep === 0) {
      setChartType("bar");
      setStyleOptions(["Bars"]);
    } else if (chartStep === 1) {
      setChartType("pie");
    } else if (chartStep === 2) {
      setChartType("line");
      setStyleOptions(["Line"]);
    } else if (chartStep === 3) {
      setChartType("funnel");
      setStyleOptions(["Bars", "Area"]);
      setAscending(false);
    }
  }, [chartStep]);

  useEffect(() => {
    if (state.results?.name) {
      console.log("title to be set", state.results.name);
      setTitle(state.results.name);
    }

    if (state.results?.results) {
      setData(state.results.results);
    }
  }, []);

  useEffect(() => {
    let currentData = state.results?.results || [];
    if (currentData.length > 0) {
      currentData = currentData.slice(0, limit);
      setData(currentData);
      handleRefresh();

      if (sortBy && sortBy.alt_value !== undefined) {
        const sortValue = sortBy.alt_value;
        const sortedData = currentData.sort((a, b) => {
          const valueA = a[sortValue];
          const valueB = b[sortValue];
          if (typeof valueA === "number" && typeof valueB === "number") {
            return ascending ? valueA - valueB : valueB - valueA;
          } else if (typeof valueA === "string" && typeof valueB === "string") {
            return ascending
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          } else if (valueA instanceof Date && valueB instanceof Date) {
            return ascending
              ? valueA.getTime() - valueB.getTime()
              : valueB.getTime() - valueA.getTime();
          }
          return 0;
        });
        setData(sortedData);
        handleRefresh();
      }
    }
  }, [limit, sortBy, ascending]);

  const handleSelectedOption = (selectedOption: DropDownOption) => {
    const selected = fieldsOptions?.find(
      (option) => option.label === selectedOption.name
    );
    if (selected?.type === FieldType.METRIC) {
      setSelectedMetric(selected);
    } else {
      setSelectedDimension(selected);
    }
  };

  const hanldeSortByOption = (selectedOption: DropDownOption) => {
    const selected = fieldsOptions?.find(
      (option) => option.label === selectedOption.name
    );
    setSortBy(selected);
  };

  const handleSliderValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));
  };

  const handleRefresh = () => {
    setForceRefresh(!forceRefresh);
  };

  useEffect(() => {
    if (caption !== "Add caption") {
      const textElement = document.getElementById("ai-insights-text");
      if (textElement) {
        textElement.innerText = "";
      }
    }
  }, [caption]);

  const handleAiInsightsClick = () => {
    // Set the inner text of of the span with id "ai-insights-text" to "Loading..."
    const textElement = document.getElementById("ai-insights-text");
    if (textElement) {
      textElement.innerText = "Loading...";
    }

    // filter daay to only include the keys for selectedMetric and selectedDimension
    const filteredData = data.map((item) => {
      const filteredItem: { [key: string]: any } = {};
      Object.keys(item).forEach((key) => {
        if (
          key === selectedMetric?.alt_value ||
          key === selectedDimension?.alt_value
        ) {
          filteredItem[key] = item[key];
        }
      });
      return filteredItem;
    });
    const captionData: CaptionData = {
      data: filteredData,
      chart_type: chartType,
    };
    DefaultService.chartInsightsQueryChartInsightsPost(captionData)
      .then((response: string) => {
        setCaption(response);
        const textElement = document.getElementById("ai-insights-text");
        if (textElement) {
          textElement.innerText = "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShareClick = () => {
    if (token) {
      DefaultService.userUserUserGet(token)
        .then((response: UserWithId) => {
          if (state.results && selectedDimension && selectedMetric) {
            let results = state.results;
            results.name = chartId;
            results.results = data;
            DefaultService.saveTableQuerySaveTablePost(
              token,
              `_${response.id}`,
              results
            );
            const chartData: ChartData = {
              chart_id: chartId,
              data: results,
              chart_type: chartType,
              selected_dimension: selectedDimension,
              selected_metric: selectedMetric,
              primary_color: primaryColor,
              secondary_color: secondaryColor,
              slice_colors: sliceColors,
              field_options: fieldsOptions,
              title: title,
              caption: caption,
            };
            DefaultService.saveChartQuerySaveChartPost(token, chartData);
          }
        })
        .catch((error) => {
          if (error.status === 401) {
            window.location.href = RouterPath.LOGIN;
          }
        })

        .then(() => {
          const modal = document.getElementById(
            "share-modal"
          ) as HTMLDialogElement;
          modal.showModal();
        });
    }
  };

  const copyToClickBoard = () => {
    navigator.clipboard.writeText(embedUrl);
  };

  useEffect(() => {
    // set div with id "caption" innerText to caption
    const captionElement = document.getElementById("caption");
    if (captionElement) {
      captionElement.innerText = caption;
    }
  }, [caption]);

  useEffect(() => {
    setEmbedUrl(`https://${window.location.host}/chart-page?id=${chartId}`);
  }, [chartId]);

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar currentUser={currentUser} />
        </div>
        <div className="col-span-6 justify-center">
          <div className="grid grid-cols-7 gap-2 bg-gray-100 rounded-lg p-4 pb-10 mx-auto mt-10 my-4 max-w-6xl">
            <div className="col-span-4 bg-white rounded-md p-4 flex justify-center mx-auto">
              <div className="grid grid-cols-7 gap-2">
                <div className="col-span-6">
                  <input
                    type="text"
                    placeholder={title}
                    value={title}
                    className="w-full placeholder-gray-300 text-black font-medium text-lg hover: border-gray-300 mt-0"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  {/* <button
                    onClick={handleAiInsightsClick}
                    className="bg-black p-2 rounded-md text-white hover:bg-gray-800 flex items-center"
                  >
                    <ShareIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">Share</span>
                  </button> */}
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="bg-black p-2 rounded-md text-white hover:bg-gray-800 flex items-center"
                    onClick={handleShareClick}
                  >
                    <ShareIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">Share</span>
                  </button>
                  <dialog id="share-modal" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg mb-2">Embed Chart</h3>

                      <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-between">
                        <p className="text-gray-700" id="linkToCopy">
                          {embedUrl}
                        </p>
                        <button
                          className="ml-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                          onClick={copyToClickBoard}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
                <div className="col-span-7 border border-gray-100 border-dashed rounded-md mt-0">
                  <Chart
                    data={data}
                    chartType={chartType}
                    xAxis={selectedDimension?.alt_value}
                    yAxis={selectedMetric?.alt_value}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    sliceColors={sliceColors}
                    fieldOptions={fieldsOptions}
                  />
                </div>
                <div className="relative col-span-7">
                  <div className="p-2 rounded-md text-gray-500 hover:border-gray-400 relative">
                    <div
                      id="caption"
                      contentEditable={true}
                      className="outline-none"
                      style={{
                        marginRight: "80px", // Adjust this value to match the button's width
                        marginBottom: "32px", // Adjust this value to match the button's height
                        textAlign: "justify",
                      }}
                      onChange={(e) =>
                        setCaption((e.target as HTMLDivElement).innerText)
                      }
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={handleAiInsightsClick}
                        className="bg-black p-2 rounded-md text-white hover:bg-gray-800 flex items-center"
                      >
                        <SparklesIcon className="h-4 w-4 mr-2" />
                        <span id="ai-insights-text" className="text-sm">
                          AI Insights
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 bg-white rounded-md p-4">
              <ul className="menu menu-horizontal bg-gray-100 rounded-md mt-0 w-full flex justify-center items-center space-x-16 mb-4 ">
                <li onClick={() => setMenuStep(1)}>
                  <a className="tooltip" data-tip="Chart">
                    <ChartBarIcon className="h-5 w-5" />
                  </a>
                </li>
                <li onClick={() => setMenuStep(2)}>
                  <a className="tooltip" data-tip="Style">
                    <PaintBrushIcon className="h-5 w-5" />
                  </a>
                </li>
                <li onClick={() => setMenuStep(0)}>
                  <a className="tooltip" data-tip="Data">
                    <TableCellsIcon className="h-5 w-5" />
                  </a>
                </li>
              </ul>
              {menuStep === 0 && state.results ? (
                <StickyHeadTable
                  columns={state.results.columns}
                  results={state.results.results}
                  rows={10}
                />
              ) : menuStep === 1 ? (
                <>
                  <h3 className="text-md leading-6 font-medium text-gray-900 mb-2">
                    Chart type
                  </h3>
                  <ul className="menu menu-horizontal border boder-gray-200 rounded-md mt-0 w-full flex justify-center items-center space-x-12 mb-4 ">
                    <li onClick={() => setChartStep(0)}>
                      <a className="tooltip" data-tip="Bar">
                        <ChartBarIcon className="h-5 w-5" />
                      </a>
                    </li>
                    <li onClick={() => setChartStep(1)}>
                      <a className="tooltip" data-tip="Pie">
                        <ChartPieIcon className="h-5 w-5" />
                      </a>
                    </li>
                    <li onClick={() => setChartStep(2)}>
                      <a className="tooltip" data-tip="Line">
                        <PresentationChartLineIcon className="h-5 w-5" />
                      </a>
                    </li>
                    <li onClick={() => setChartStep(3)}>
                      <a className="tooltip" data-tip="Funnel">
                        <FunnelIcon className="h-5 w-5" />
                      </a>
                    </li>
                  </ul>
                  {fieldsOptions && (
                    <ChartConfig
                      limit={limit}
                      ascending={ascending}
                      setAscending={setAscending}
                      chartType={chartType}
                      sortBy={sortBy}
                      metricOptions={metricOptions}
                      dimensionOptions={dimensionOptions}
                      selectedMetric={selectedMetric}
                      selectedDimension={selectedDimension}
                      handleSelectedOption={handleSelectedOption}
                      hanldeSortByOption={hanldeSortByOption}
                      handleSliderValue={handleSliderValue}
                    />
                  )}
                </>
              ) : menuStep === 2 ? (
                <ChartStyle
                  options={styleOptions}
                  chartType={chartType}
                  primaryColor={primaryColor}
                  setPrimaryColor={setPrimaryColor}
                  secondaryColor={secondaryColor}
                  setSecondaryColor={setSecondaryColor}
                  sliceColors={sliceColors}
                  setSliceColors={setSliceColors}
                  limit={limit}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
