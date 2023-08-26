import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { Dropdown } from "../Components/DropDown";
import { DropDownOption } from "../Components/MultiSelectDropDown";
import { ChatInterface } from "../Components/ChatInterface";
import {
  DefaultService,
  DataSourceInDB,
  User,
  CurrentResults,
  OnboardingStage,
} from "../vizoApi";
import { RouterPath } from "../App";
import { DataPreview } from "../Components/DataPreview";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export const Ask: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSourceInDB[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<DropDownOption[]>([]);
  const [selectedDataSource, setSelectedDataSource] =
    useState<DataSourceInDB>();
  const [results, setResults] = useState<Object[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((user: User) => {
          setCurrentUser(user);
          DefaultService.dataSourcesQueryDataSourcesGet(user.email).then(
            (response) => {
              setDataSources(response);
              if (user.onboarding_stage === OnboardingStage.CONNECT) {
                const tutorialData = response.find(
                  (dataSource) => dataSource.name === "tutorial_data"
                );
                console.log("tutorialData", tutorialData);
                if (tutorialData !== undefined) {
                  setSelectedDataSource(tutorialData);
                }
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
      };
      options.push(option);
    });

    setDropDownOptions(options);
  }, [dataSources, currentUser]);

  useEffect(() => {
    if (selectedDataSource) {
      DefaultService.tableResultsQueryTableResultsGet(
        selectedDataSource.table_name
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
      setSelectedDataSource(dataSource);
    }
  };

  const routeChange = () => {
    navigate(RouterPath.CONNECT);
  };

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-6 justify-center">
          <div
            id="askContainer"
            className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl relative"
          >
            {selectedDataSource?.name == "tutorial_data" && (
              <button
                className="flex items-center absolute top-1 right-1 bg-white border border-darkgray dark:border-black rounded-full px-4 py-2 hover:bg-teal-500 hover:text-white transition-colors duration-300"
                onClick={routeChange}
              >
                Add your own data
                <ArrowRightIcon className="w-5 h-5 ml-1" />
              </button>
            )}
            <h1 className="text-2xl font-bold mb-4">Ask</h1>
            <p className="mb-4 text-sm leading-5 text-gray-500">
              Use plain English to ask questions about your data. AirPipe's AI
              will get the results to answer your question.
            </p>
            <Dropdown
              options={dropDownOptions}
              onSelectOption={handleSelectOption}
            ></Dropdown>
            {selectedDataSource && columns && results && (
              <>
                <DataPreview
                  columns={columns}
                  results={results}
                  tablePreview={true}
                />
                <ChatInterface
                  dataSources={[selectedDataSource]}
                  currentUser={currentUser}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
