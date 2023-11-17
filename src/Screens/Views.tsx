import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { BaseView } from "../Components/BaseView";

import { DefaultService, CurrentResults } from "../vizoApi";
import { User, ViewInDB } from "../vizoApi";
import { RouterPath } from "../App";
import { StickyHeadTable } from "../Components/Table";

export const Views: React.FC = () => {
  const [views, setViews] = useState<ViewInDB[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [selectedView, setSelectedView] = useState<ViewInDB>();
  const [results, setResults] = useState<Object[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

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
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((response: User) => {
          setCurrentUser(response);
          DefaultService.viewsQueryViewsGet(response.email).then((response) => {
            setViews(response);
          });
        })
        .catch((error) => {
          window.location.href = RouterPath.LOGIN;
        });
    }
  }, []);

  useEffect(() => {
    if (selectedView) {
      DefaultService.tableResultsQueryTableResultsGet(
        selectedView.db_schema,
        selectedView.name
      )
        .then((response: CurrentResults) => {
          setResults(response.results);
          setColumns(response.columns);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedView]);

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        {!isMobile && (
          <div className="col-span-1">
            <SideBar currentUser={currentUser} />
          </div>
        )}
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-2">Views</h1>
            <p className="mb-4 text-sm leading-5 text-gray-500">
              Manage your views.
            </p>
            <>
              {selectedView ? (
                <>
                  <BaseView
                    view={selectedView}
                    setSelectedView={setSelectedView}
                    selected={true}
                  />
                  <StickyHeadTable results={results} columns={columns} />
                </>
              ) : (
                views.map((view: ViewInDB) => (
                  <BaseView
                    view={view}
                    setSelectedView={setSelectedView}
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
