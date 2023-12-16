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
import { CustomModal } from "../Components/CustomModal";

import {
  TableDescriptionsService,
  ScannerRequest,
  InstructionsService,
  InstructionRequest,
} from "../dataHeraldApi";

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
  const [welcome, setWelcome] = useState(false);
  const [modal, setModal] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [connectionId, setConnectionId] = useState<string>("");

  let navigate = useNavigate();

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
          window.location.href = RouterPath.LOGIN;
        });
    }
  }, []);

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
    const aiConsent = localStorage.getItem("aiConsent");
    if (!aiConsent) {
      setModal(true);
    }
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

  const handleAiConsent = () => {
    localStorage.setItem("aiConsent", "true");
    setModal(false);
  };

  const routeChange = () => {
    navigate(RouterPath.CONNECT);
  };

  useEffect(() => {
    if (selectedDataSource !== undefined) {
      DefaultService.connectDbQueryDataheraldConnectDbPost(
        selectedDataSource?.db_schema,
        false,
        "airpipe_db"
      )
        .then((connection_id: string) => {
          setConnectionId(connection_id);
          const requestBody: ScannerRequest = {
            db_connection_id: connection_id,
            table_names: [selectedDataSource.name],
          };
          TableDescriptionsService.scanDb(requestBody)
            .catch((error) => {
              console.log(error);
            })
            .then(() => {
              const instructionRequestBody: InstructionRequest = {
                db_connection_id: connection_id,
                instruction:
                  "Unless specified, give calculations to two decimal places.",
              };
              InstructionsService.addInstruction(instructionRequestBody).catch(
                (error) => {
                  console.log(error);
                }
              );
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDataSource]);

  return (
    <>
      {welcome === true ? (
        <WelcomeModal setWelcome={setWelcome} />
      ) : (
        <>
          {" "}
          <NavBar />
          <div className="h-screen grid grid-cols-7 gap-2 p-0">
            <div className="col-span-1">
              <SideBar currentUser={currentUser} />
            </div>
            <div className="col-span-6 justify-center">
              <div
                id="askContainer"
                className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl relative"
              >
                {selectedDataSource?.name == "tutorial_data" && (
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
                <Dropdown
                  options={dropDownOptions}
                  onSelectOption={handleSelectOption}
                ></Dropdown>
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
                        connectionId={connectionId}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <CustomModal
        parentshow={modal}
        setParentShow={setModal}
        style={{ minWidth: "400px", minHeight: "300px" }}
      >
        <>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Privacy-First AI
            </h1>
            <div className="text-left">
              <p className="text-sm font-light text-gray-500">
                To power our AI Analysis features, AirPipe uses the OpenAI API.
                Here's what we send to OpenAI:
              </p>
              <br></br>
              <ul className="text-sm font-light text-gray-500">
                <li className="mb-2">
                  <strong>Column Names:</strong> In our use of the OpenAI API,
                  we only send column names from your selected data source or
                  view. This means that no actual channel data, personal
                  information, or sensitive details are transmitted to OpenAI
                  for processing.
                </li>
                <li className="mb-2">
                  <strong>Anonymization of Data:</strong> Any column names sent
                  to OpenAI are stripped of personal identifiers or sensitive
                  information to ensure your privacy.
                </li>
                <li className="mb-2">
                  <strong>Storage:</strong> OpenAI does not store these column
                  names for any purpose other than the immediate processing
                  required for the functionality you are using within AirPipe.
                </li>
              </ul>

              <p className="text-sm font-light text-gray-500">
                You can find more information about this in our{" "}
                <a
                  href="https://useairpipe.com/privacy"
                  target="_blank"
                  className="underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center">
                  <input
                    id="privacy"
                    aria-describedby="privacy"
                    type="checkbox"
                    className="w-4 h-4 border mt-0 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 align-middle" // Added align-middle here
                    onChange={() => setPrivacyChecked(!privacyChecked)}
                  />
                </div>
                <label
                  htmlFor="privacy"
                  className="ml-3 text-sm font-light text-gray-500 align-middle" // Added align-middle here
                >
                  I consent to sharing my data with OpenAI for enhanced user
                  experience and analytics.
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 mt-5 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center mx-auto disabled:opacity-50"
              disabled={!privacyChecked}
              onClick={() => handleAiConsent()}
            >
              Continue
            </button>
          </div>
        </>
      </CustomModal>
    </>
  );
};
