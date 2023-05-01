import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { BaseDataSource } from "../Components/BaseDataSource";

import { DefaultService } from "../vizoApi";
import { User, DataSourceInDB } from "../vizoApi";
import { RouterPath } from "../App";

export const DataSources: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSourceInDB[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((response: User) => {
          DefaultService.getDataSourcesQueryDataSourcesGet(response.email).then(
            (response) => {
              console.log(response);
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
            {dataSources.map((dataSource) => (
              <BaseDataSource dataSource={dataSource} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
