import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { BaseDataSource } from "../Components/BaseDataSource";

import { DefaultService, CurrentResults } from "../vizoApi";
import { User, DataSourceInDB } from "../vizoApi";
import { RouterPath } from "../App";
import { StickyHeadTable } from "../Components/Table";

export const DataSources: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSourceInDB[]>([]);
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
          DefaultService.getDataSourcesQueryDataSourcesGet(response.email).then(
            (response) => {
              setDataSources(response);
            }
          );
        })
        .catch((error) => {
          window.location.href = RouterPath.LOGIN;
        });
    }
  }, []);

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

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">Data Sources</h1>
            <>
              {selectedDataSource ? (
                <>
                  <BaseDataSource
                    dataSource={selectedDataSource}
                    setSelectedDataSource={setSelectedDataSource}
                    csvData={results}
                    selected={true}
                  />
                  <StickyHeadTable results={results} columns={columns} />
                </>
              ) : (
                dataSources.map((dataSource: DataSourceInDB) => (
                  <BaseDataSource
                    dataSource={dataSource}
                    setSelectedDataSource={setSelectedDataSource}
                    selected={false}
                  />
                ))
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};
