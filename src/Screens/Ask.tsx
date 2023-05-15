import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { ChatInterface } from "../Components/ChatInterface";
import { Dropdown, DropDownOption } from "../Components/DropDown";
import { DefaultService, DataSourceInDB, User } from "../vizoApi";
import { RouterPath } from "../App";

export const Ask: React.FC = () => {
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

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-7xl">
            <h1 className="text-2xl font-bold mb-4">Ask</h1>
            <Dropdown
              options={dropDownOptions}
              onSelectOption={handleSelectOption}
            ></Dropdown>
            {selectedDataSource && (
              <ChatInterface tableName={selectedDataSource.table_name} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
