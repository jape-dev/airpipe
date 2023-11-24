import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { Dropdown } from "../Components/DropDown";
import { DropDownOption } from "../Components/DropDown";
import { ChatInterface } from "../Components/ChatInterface";
import {
  DefaultService,
  DataSourceInDB,
  User,
  CurrentResults,
  OnboardingStage,
  ViewInDB,
  ChannelType,
} from "../vizoApi";
import { RouterPath } from "../App";
import { DataPreview } from "../Components/DataPreview";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { WelcomeModal } from "../Components/Welcome";
import { getChannelTypeEnum } from "../Utils/StaticData";

export const Ask: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [dataSources, setDataSources] = useState<DataSourceInDB[]>([]);
  const [views, setViews] = useState<ViewInDB[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<DropDownOption[]>([]);
  const [selectedDataSource, setSelectedDataSource] =
    useState<DataSourceInDB>();
  const [results, setResults] = useState<Object[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [isMobile, setIsMobile] = useState(false);
  const [welcome, setWelcome] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      setToken(token);
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((user: User) => {
          setCurrentUser(user);
          DefaultService.dataSourcesQueryDataSourcesGet(token)
            .then((response) => {
              setDataSources(response);
              if (user.onboarding_stage === OnboardingStage.CONNECT) {
                const tutorialData = response.find(
                  (dataSource) => dataSource.name === "tutorial_data"
                );
                if (tutorialData !== undefined) {
                  setSelectedDataSource(tutorialData);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
          DefaultService.viewsQueryViewsGet(token)
            .then((response) => {
              setViews(response);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    // produce a list of DropDownOptions from the list of AdAccounts
    let options: DropDownOption[] = [];
    if (currentUser?.onboarding_stage == OnboardingStage.CONNECT) {
      options.push({
        id: "add_data",
        name: "Add your own data",
        img: "plus-icon",
      });
    }
    dataSources.map((source) => {
      const option: DropDownOption = {
        id: source.id.toString(),
        name: source.name,
        img: source.channel_img,
        ad_account_id: source.ad_account_id,
        channel: getChannelTypeEnum(source.channel),
      };
      options.push(option);
      setDropDownOptions(options);
    });
    views.map((view) => {
      const option: DropDownOption = {
        id: view.id.toString(),
        name: view.name,
      };
      options.push(option);
      setDropDownOptions(options);
    });
  }, [dataSources, views, currentUser]);

  useEffect(() => {
    console.log("table results called");
    if (selectedDataSource && token) {
      DefaultService.tableResultsQueryTableResultsGet(
        token,
        selectedDataSource.db_schema,
        selectedDataSource.name,
        selectedDataSource.channel_img !== "na"
          ? `${selectedDataSource.channel}_date`
          : undefined,
        selectedDataSource.start_date,
        selectedDataSource.end_date
      )
        .then((response: CurrentResults) => {
          setResults(response.results);
          setColumns(response.columns);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDataSource]);

  const handleSelectOption = (selectedOption: DropDownOption) => {
    if (selectedOption.id === "add_data") {
      window.location.href = RouterPath.CONNECT;
    } else {
      const dataSource = dataSources.find(
        // Need to use an actual id field instead of ad_account_id
        (dataSource) => dataSource.id.toString() === selectedOption.id
      );
      const view = views.find(
        (view) => view.id.toString() === selectedOption.id
      );
      if (view) {
        const viewAsDataSource: DataSourceInDB = {
          id: view.id,
          name: view.name,
          user_id: view.user_id,
          db_schema: view.db_schema,
          fields: view.fields,
          table_name: view.table_name,
          channel: ChannelType.GOOGLE,
          channel_img: "na",
          ad_account_id: "na",
          start_date: view.start_date,
          end_date: view.end_date,
        };
        setSelectedDataSource(viewAsDataSource);
      } else {
        setSelectedDataSource(dataSource);
      }
    }
  };

  const routeChange = () => {
    navigate(RouterPath.CONNECT);
  };

  return (
    <>
      {welcome === true ? (
        <WelcomeModal setWelcome={setWelcome} />
      ) : (
        <>
          {" "}
          <NavBar />
          <div className="h-screen grid grid-cols-7 gap-2 p-0">
            {!isMobile && (
              <div className="col-span-1">
                <SideBar currentUser={currentUser} />
              </div>
            )}
            <div className="col-span-6 justify-center">
              <div
                id="askContainer"
                className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl relative"
              >
                {selectedDataSource?.name == "tutorial_data" && !isMobile && (
                  <>
                    <button
                      id="add-data-button"
                      type="button"
                      className="flex items-center absolute top-1 right-1 bg-white border border-darkgray dark:border-black rounded-full px-4 py-2 hover:bg-teal-500 hover:text-white transition-colors duration-300"
                      onClick={routeChange}
                    >
                      Add your own data
                      <ArrowRightIcon className="w-5 h-5 ml-1" />
                    </button>
                  </>
                )}
                <div id="main-title">
                  <h1 className="text-2xl font-bold mb-4">
                    {selectedDataSource?.name == "tutorial_data"
                      ? "Ask - AI Tutorial"
                      : "Ask"}
                  </h1>
                </div>
                <p className="mb-4 text-sm leading-5 text-gray-500">
                  Use plain English to ask questions about your data. Use
                  specific column names from the table to improve the accuracy
                  of your query.
                </p>
                {currentUser?.onboarding_stage !== OnboardingStage.CONNECT && (
                  <Dropdown
                    options={dropDownOptions}
                    onSelectOption={handleSelectOption}
                  ></Dropdown>
                )}
                {selectedDataSource && columns && results && (
                  <>
                    <div id="data-preview">
                      <DataPreview
                        columns={columns}
                        results={results}
                        tablePreview={true}
                      />
                    </div>
                    <div id="chat-interface">
                      <ChatInterface
                        dataSources={[selectedDataSource]}
                        currentUser={currentUser}
                        userToken={token}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
