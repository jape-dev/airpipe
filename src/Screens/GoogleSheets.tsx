import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import {
  DefaultService,
  User,
  SpreadsheetWithRefreshToken,
  SpreadsheetResponse,
  DataSourceInDB,
} from "../vizoApi";
import { RouterPath } from "../App";
import { Dropdown } from "../Components/DropDown";
import { DropDownOption } from "../Components/DropDown";
import {
  getChannelTypeEnum,
  getChannelNameFromEnum,
} from "../Utils/StaticData";

import { TableCellsIcon } from "@heroicons/react/24/solid";

export const GoogleSheets: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [sheetName, setSheetName] = useState("");
  const [loading, setLoading] = useState(false);
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetResponse>();

  const [dataSources, setDataSources] = useState<DataSourceInDB[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<DropDownOption[]>([]);
  const [selectedDataSource, setSelectedDataSource] =
    useState<DataSourceInDB>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((user: User) => {
          setCurrentUser(user);
          DefaultService.dataSourcesQueryDataSourcesGet(token).then(
            (response) => {
              setDataSources(response);
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
    dataSources.map((source) => {
      const option: DropDownOption = {
        id: source.id.toString(),
        name: source.name,
        img: source.channel_img,
        ad_account_id: source.ad_account_id,
        channel: getChannelTypeEnum(source.channel),
      };
      options.push(option);
    });

    setDropDownOptions(options);
  }, [dataSources, currentUser]);

  const handleSheetSubmit = () => {
    setLoading(true);
    if (
      currentUser?.google_sheets_refresh_token &&
      selectedDataSource?.db_schema &&
      selectedDataSource?.name &&
      title
    ) {
      const spreadsheet: SpreadsheetWithRefreshToken = {
        refresh_token: currentUser.google_sheets_refresh_token,
        title: title,
        sheet_name: sheetName,
        db_schema: selectedDataSource.db_schema,
        db_name: selectedDataSource.name,
      };
      DefaultService.createConnectorSheetsCreatePost(spreadsheet).then(
        (response) => {
          setSpreadsheet(response);
          setLoading(false);
        }
      );
    }
  };

  const handleSelectOption = (selectedOption: DropDownOption) => {
    if (selectedOption.id === "add_data") {
      window.location.href = RouterPath.CONNECT;
    } else {
      const dataSource = dataSources.find(
        // Need to use an actual id field instead of ad_account_id
        (dataSource) => dataSource.id.toString() === selectedOption.id
      );
      if (dataSource) {
        setSelectedDataSource(dataSource);
        let titleName = `${getChannelNameFromEnum(selectedOption)} - ${
          selectedOption.ad_account_id
        }`;
        setTitle(titleName);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar currentUser={currentUser} />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-2">Google Sheets</h1>
            <p className="mb-4 text-sm leading-5 text-gray-500">
              Share your data to Google Sheets
            </p>
            {spreadsheet ? (
              <p>
                Spreadhseet url:{" "}
                <a
                  href={spreadsheet.url}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {spreadsheet.url}
                </a>
              </p>
            ) : (
              <>
                <Dropdown
                  options={dropDownOptions}
                  onSelectOption={handleSelectOption}
                />
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  id="title"
                  name="title"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg mb-5 focus:ring-gray-500 focus:border-teal-500 block w-full p-2.5"
                  placeholder={
                    selectedDataSource
                      ? selectedDataSource.name
                      : "Spreadsheet title"
                  }
                  value={title ? title : "Spreadsheet title"}
                />
                {selectedDataSource && title && (
                  <button
                    className="bg-teal-500 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
                    onClick={handleSheetSubmit}
                  >
                    {loading ? ( // Render loading animation if isLoading is true
                      <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                    ) : (
                      <>
                        <TableCellsIcon className="inline h-6 w-6 mr-2" />
                        <span className="text-lg">Create Google Sheet</span>
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
