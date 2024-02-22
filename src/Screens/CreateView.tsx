import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { Dropdown, DropDownOption } from "../Components/DropDown";
import {
  DefaultService,
  DataSourceInDB,
  User,
  View,
  OnboardingStage,
  FieldOption,
  FieldType,
  CurrentResults,
  JoinCondition,
  Body_create_blend_query_create_blend_post,
  FieldOptionWithDataSourceId,
  ViewInDB,
} from "../vizoApi";
import { RouterPath } from "../App";
import { StickyHeadTable } from "../Components/Table";
import { FieldList } from "../Components/FieldList";
import { useNavigate, useLocation } from "react-router-dom";
import { DateSelector } from "../Components/DateSelector";
import { Blender } from "../Components/Blender";
import { ConfigureBlend } from "../Components/ConfigureBlend";
import { getChannelTypeEnum } from "../Utils/StaticData";
import { AddDataButton } from "../Components/AddDataButton";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export interface CreateViewState {
  dataSource?: DataSourceInDB;
}

export const CreateView: React.FC = () => {
  const location = useLocation();
  const state = location.state as CreateViewState;

  const [token, setToken] = useState<string>("");
  const [dataSources, setDataSources] = useState<DataSourceInDB[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<DropDownOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<DropDownOption>();
  const [selectedDataSource, setSelectedDataSource] =
    useState<DataSourceInDB>();
  const [currentUser, setCurrentUser] = useState<User>();

  const [results, setResults] = useState<Object[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const [fieldOptions, setFieldOptions] = useState<FieldOption[]>([]);
  const [fieldType, setFieldType] = useState<FieldType>(FieldType.METRIC);
  const [selectedOptions, setSelectedOptions] = useState<FieldOption[]>([]);
  const [showFieldList, setShowFieldList] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [showBlender, setShowBlender] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfigureBlend, setShowConfigureBlend] = useState(false);
  const [leftDataSource, setLeftDataSource] = useState<DataSourceInDB>();
  const [rightDataSource, setRightDataSource] = useState<DataSourceInDB>();
  const [joinConditions, setJoinConditions] = useState<JoinCondition[]>([]);
  const [selectedBlendOptions, setSelectedBlendOptions] = useState<
    FieldOptionWithDataSourceId[]
  >([]);
  const [viewName, setViewName] = useState<string>("");
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState<Date>(() => {
    return selectedDataSource?.start_date
      ? new Date(selectedDataSource.start_date)
      : new Date(new Date().getFullYear(), 0, 1);
  });

  const [endDate, setEndDate] = useState<Date>(() => {
    return selectedDataSource?.end_date
      ? new Date(selectedDataSource.end_date)
      : new Date();
  });

  let navigate = useNavigate();

  const handleSelectOption = (selectedOption: DropDownOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.id === "add_data") {
      window.location.href = RouterPath.CONNECT;
    } else {
      const dataSource = dataSources.find(
        // Need to use an actual id field instead of ad_account_id
        (dataSource) => dataSource.id.toString() === selectedOption.id
      );
      setSelectedDataSource(dataSource);
    }
  };

  const handleStartDateClick = (date: Date | null) => {
    if (date === null) {
      return;
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateClick = (date: Date | null) => {
    if (date === null) {
      return;
    } else {
      setEndDate(date);
    }
  };

  const routeChange = () => {
    navigate(RouterPath.CONNECT);
  };

  const handleDataPreviewButtonClick = () => {
    setShowBlender(false);
    setShowPreview(true);
  };

  const handleConfigureBlendButtonClick = () => {
    setShowBlender(false);
    setShowConfigureBlend(true);
  };

  const handleSaveJoinConditions = () => {
    setShowBlender(true);
    setShowPreview(false);
    setShowConfigureBlend(false);
  };

  const handleSaveBlend = () => {
    if (!leftDataSource || !rightDataSource) {
      return;
    }
    let body: Body_create_blend_query_create_blend_post = {
      fields: selectedBlendOptions,
      left_data_source: leftDataSource,
      right_data_source: rightDataSource,
      join_conditions: joinConditions,
    };
    DefaultService.createBlendQueryCreateBlendPost(
      token,
      body,
      `${leftDataSource.channel}_date`,
      startDate.toISOString(),
      endDate.toISOString()
    )
      .then((response) => {
        setResults(response.results);
        setColumns(response.columns);
        setShowBlender(false);
        setShowPreview(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setViewName(event.target.value);
  };

  const saveView = () => {
    let view: View = {
      name: viewName,
      fields: selectedOptions,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      join_conditions: joinConditions,
    };
    if (currentUser) {
      DefaultService.saveViewQuerySaveViewPost(token, view)
        .then((response: ViewInDB) => {
          setModal(false);
          setIsLoading(false);
          let data: CurrentResults = {
            columns: columns,
            results: results,
            name: response.name,
          };
          DefaultService.saveTableQuerySaveTablePost(
            token,
            response.db_schema,
            data
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
    }
  };

  const handleSaveDateRange = () => {
    // I need to get the data source as it is, not from the table and apply the date range though
    // Call an endpoint that filters the data source on the date range
    setShowDateSelector(false);
  };

  useEffect(() => {
    if (selectedDataSource) {
      setStartDate(new Date(selectedDataSource.start_date));
      setEndDate(new Date(selectedDataSource.end_date));
      DefaultService.dataSourceFieldOptionsQueryDataSourceFieldOptionsPost(
        selectedDataSource
      ).then((response) => {
        setFieldOptions(response);
        setSelectedOptions(response);
      });
    }
  }, [selectedDataSource]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      setToken(token);
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((user: User) => {
          setCurrentUser(user);
          DefaultService.dataSourcesQueryDataSourcesGet(token).then(
            (response) => {
              setDataSources(response);
              if (state.dataSource) {
                const option: DropDownOption = {
                  id: state.dataSource.id.toString(),
                  name: state.dataSource.name,
                  img: state.dataSource.channel_img,
                  ad_account_id: state.dataSource.ad_account_id,
                  channel: getChannelTypeEnum(state.dataSource.channel),
                };
                setSelectedOption(option);
                setSelectedDataSource(state.dataSource);
              }
            }
          );
        })
        .catch((error) => {
          console.log(error);
          window.location.href = RouterPath.LOGIN;
        });
    }
  }, []);

  useEffect(() => {
    if (selectedDataSource) {
      DefaultService.tableResultsQueryTableResultsGet(
        token,
        selectedDataSource.db_schema,
        selectedDataSource.name,
        `${selectedDataSource.channel}_date` in columns
          ? `${selectedDataSource.channel}_date`
          : undefined,
        startDate.toISOString(),
        endDate.toISOString()
      )
        .then((response: CurrentResults) => {
          setResults(response.results);
          setColumns(response.columns);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDataSource, startDate, endDate]);

  useEffect(() => {
    // produce a list of DropDownOptions from the list of AdAccounts
    let options: DropDownOption[] = [];
    dataSources.map((source) => {
      const option: DropDownOption = {
        id: source.id.toString(),
        name: source.name,
        img: source.channel_img,
        ad_account_id: source.ad_account_id,
        channel: getChannelTypeEnum(source.channel),
      };
      console.log(option);
      options.push(option);
    });

    setDropDownOptions(options);
  }, [dataSources, currentUser]);

  useEffect(() => {
    setJoinConditions([]);
    setSelectedBlendOptions([]);
  }, [leftDataSource, rightDataSource]);

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar currentUser={currentUser} />
        </div>
        <div className="col-span-6 justify-center">
          <div
            id="viewContainer"
            className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl relative"
          >
            <div id="main-title">
              <h1 className="text-2xl font-bold mb-4">Create a view</h1>
            </div>
            <p className="mb-4 text-sm leading-5 text-gray-500">
              Create a new from a data sources. Create a blend to combine data
              sources.
            </p>
            {!showBlender && !showPreview && !showConfigureBlend && (
              <Dropdown
                options={dropDownOptions}
                onSelectOption={handleSelectOption}
                defaultOption={selectedOption}
              ></Dropdown>
            )}
            <>
              {selectedDataSource && (
                <>
                  {showFieldList ? (
                    <>
                      <FieldList
                        fieldOptions={fieldOptions}
                        setFieldOptions={setFieldOptions}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        fieldType={fieldType}
                        setFieldType={setFieldType}
                      />
                      <button
                        onClick={() => setShowFieldList(false)}
                        className="bg-teal-500 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
                      >
                        <CheckCircleIcon className="inline h-6 w-6 mr-2" />
                        <span className="text-lg">Confirm</span>
                      </button>
                    </>
                  ) : showBlender ? (
                    <>
                      <Blender
                        fieldOptions={fieldOptions}
                        dataSources={dataSources}
                        selectedDataSource={selectedDataSource}
                        dropDownOptions={dropDownOptions}
                        selectedOption={selectedOption}
                        leftDataSource={leftDataSource}
                        setLeftDataSource={setLeftDataSource}
                        rightDataSource={rightDataSource}
                        setRightDataSource={setRightDataSource}
                        selectedBlendOptions={selectedBlendOptions}
                        setSelectedBlendOptions={setSelectedBlendOptions}
                      />
                      <div className="flex space-x-4 justify-center">
                        <button
                          onClick={() => handleConfigureBlendButtonClick()}
                          className="border border-teal-600 hover:bg-teal-600 mt-5 text-teal-600 hover:text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center"
                        >
                          <span className="text-md">
                            <Cog6ToothIcon className="inline h-5 w-5 mr-1" />{" "}
                            Configure Blend
                          </span>
                        </button>
                        {/* <button
                          onClick={() => handleDataPreviewButtonClick()}
                          className="border border-teal-600 hover:bg-teal-600 mt-5 text-teal-600 hover:text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center"
                        >
                          Preview data
                        </button> */}
                        {joinConditions.length > 0 && (
                          <button
                            onClick={() => handleSaveBlend()}
                            className="bg-teal-500 hover:bg-teal-600 mt-5 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center"
                          >
                            <span className="text-md">
                              <PlusCircleIcon className="inline h-5 w-5 mr-1" />{" "}
                              Save Blend
                            </span>
                          </button>
                        )}
                      </div>
                    </>
                  ) : showPreview ? (
                    <>
                      <StickyHeadTable
                        columns={columns}
                        results={results}
                        rows={3}
                      />
                      <button
                        onClick={() => {
                          setShowPreview(false);
                          setShowBlender(true);
                        }}
                        className="bg-teal-500 text-white rounded-md mt-5 px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
                      >
                        <span className="text-lg">Back</span>
                      </button>
                    </>
                  ) : showConfigureBlend &&
                    leftDataSource &&
                    rightDataSource ? (
                    <>
                      <ConfigureBlend
                        leftDataSource={leftDataSource}
                        rightDataSource={rightDataSource}
                        joinConditions={joinConditions}
                        setJoinConditions={setJoinConditions}
                      />
                      <button
                        onClick={() => handleSaveJoinConditions()}
                        className="bg-teal-500 hover:bg-teal-600 mt-5 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
                      >
                        <span className="text-md">
                          <PlusCircleIcon className="inline h-5 w-5 mr-1" />{" "}
                          Save Conifguration
                        </span>
                      </button>
                    </>
                  ) : showDateSelector ? (
                    <div className="flex items-center justify-center space-x-4">
                      {" "}
                      {/* Adjust the space as needed */}
                      <DateSelector
                        startDate={startDate}
                        endDate={endDate}
                        handleStartDateClick={handleStartDateClick}
                        handleEndDateClick={handleEndDateClick}
                      />
                      <button
                        onClick={() => handleSaveDateRange()}
                        className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center"
                      >
                        Save date range
                      </button>
                    </div>
                  ) : (
                    <>
                      <StickyHeadTable
                        columns={columns}
                        results={results}
                        rows={5}
                      />
                      <div className="flex space-x-4 justify-center">
                        {joinConditions.length === 0 && (
                          <button
                            onClick={() => setShowFieldList(true)}
                            className="border border-teal-600 hover:bg-teal-600 mt-5 text-teal-600 hover:text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
                          >
                            <span className="text-md">
                              <ListBulletIcon className="inline h-5 w-5 mr-1" />{" "}
                              Edit fields
                            </span>
                          </button>
                        )}
                        <button
                          onClick={() => setShowBlender(true)}
                          className="border border-teal-600 hover:bg-teal-600 mt-5 text-teal-600 hover:text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
                        >
                          <span className="text-md">
                            <LinkIcon className="inline h-5 w-5 mr-1" />{" "}
                            {joinConditions.length > 0
                              ? "Edit blend"
                              : "Create blend"}
                          </span>
                        </button>
                        {joinConditions.length === 0 && (
                          <button
                            onClick={() => setShowDateSelector(true)}
                            className="border border-teal-600 hover:bg-teal-600 mt-5 text-teal-600 hover:text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center mx-auto"
                          >
                            <span className="text-md">
                              <CalendarDaysIcon className="inline h-5 w-5 mr-1" />{" "}
                              Date range
                            </span>
                          </button>
                        )}
                        <AddDataButton
                          handleNameChange={handleViewNameChange}
                          handleNameSubmit={saveView}
                          buttonText={"Create view"}
                          modal={modal}
                          setModal={setModal}
                          loading={isLoading}
                          setLoading={setIsLoading}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};
