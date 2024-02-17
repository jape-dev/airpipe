import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { BaseDataSource } from "../Components/BaseDataSource";
import { useLocation } from "react-router-dom";

import { DefaultService, CurrentResults } from "../vizoApi";
import { User, DataSourceInDB } from "../vizoApi";
import { RouterPath } from "../App";
import { StickyHeadTable } from "../Components/Table";

export const DataSources: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSourceInDB[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [selectedDataSource, setSelectedDataSource] =
    useState<DataSourceInDB>();
  const [results, setResults] = useState<Object[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [token, setToken] = useState<string>("");
  const [requestCount, setRequestCount] = useState(0);
  const requestLimit = 12;

  useEffect(() => {
    const getDataSources = () => {
      const userToken = localStorage.getItem("token");
      if (userToken === null) {
        window.location.href = RouterPath.LOGIN;
      } else {
        setToken(userToken);
        DefaultService.currentUserUserAuthCurrentUserGet(userToken)
          .then((response: User) => {
            setCurrentUser(response);
            DefaultService.dataSourcesQueryDataSourcesGet(userToken).then(
              (response) => {
                setDataSources(response);
              }
            );
          })
          .catch((error) => {
            window.location.href = RouterPath.LOGIN;
          });
      }
    };

    // Run once immediately and then set the interval
    getDataSources(); // To ensure it runs immediately the first time
    const interval = setInterval(() => {
      if (requestCount < requestLimit) {
        getDataSources();
        setRequestCount(requestCount + 1);
      } else {
        clearInterval(interval);
      }
    }, 5000); // Run every 5 seconds

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []); // Ensure this effect only runs once

  useEffect(() => {
    if (selectedDataSource) {
      DefaultService.tableResultsQueryTableResultsGet(
        token,
        selectedDataSource.db_schema,
        selectedDataSource.name,
        `${selectedDataSource.channel}_date` in columns
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

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar currentUser={currentUser} />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-2">Data Sources</h1>
            <p className="mb-4 text-sm leading-5 text-gray-500">
              View your data sources.
            </p>
            <>
              {selectedDataSource ? (
                <>
                  <BaseDataSource
                    dataSource={selectedDataSource}
                    selected={true}
                    firstSource={true}
                  />
                  <StickyHeadTable results={results} columns={columns} />
                </>
              ) : (
                dataSources.map((dataSource: DataSourceInDB, index) => (
                  <BaseDataSource
                    dataSource={dataSource}
                    selected={false}
                    firstSource={index === 0 ? true : false}
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
