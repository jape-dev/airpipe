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
} from "../vizoApi";
import { RouterPath } from "../App";
import { DataPreview } from "../Components/DataPreview";

export const Ask: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSourceInDB[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<DropDownOption[]>([]);
  const [selectedDataSource, setSelectedDataSource] =
    useState<DataSourceInDB>();
  const [results, setResults] = useState<Object[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((response: User) => {
          DefaultService.dataSourcesQueryDataSourcesGet(response.email).then(
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
      };
      options.push(option);
    });
    setDropDownOptions(options);
  }, [dataSources]);

  const handleSelectOption = (selectedOption: DropDownOption) => {
    const dataSource = dataSources.find(
      // Need to use an actual id field instead of ad_account_id
      (dataSource) => dataSource.id.toString() === selectedOption.id
    );
    setSelectedDataSource(dataSource);
  };

  useEffect(() => {
    if (selectedDataSource) {
      DefaultService.tableResultsQueryTableResultsGet(
        selectedDataSource.table_name
      )
        .then((response: CurrentResults) => {
          console.log(response);
          setResults(response.results);
          setColumns(response.columns);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDataSource]);

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">Ask</h1>
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
                <ChatInterface dataSources={[selectedDataSource]} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
