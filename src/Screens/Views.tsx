import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { BaseView } from "../Components/BaseView";

import { DefaultService, CurrentResults, User, ViewInDB } from "../vizoApi";
import { RouterPath } from "../App";
import { StickyHeadTable } from "../Components/Table";

export const Views: React.FC = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string>("");
  const [views, setViews] = useState<ViewInDB[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [selectedView, setSelectedView] = useState<ViewInDB>();
  const [results, setResults] = useState<Object[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [requestCount, setRequestCount] = useState(0);
  const requestLimit = 12;

  const hanldeChartClick = () => {
    if (!selectedView) {
      console.log("view not selected");
      return;
    }
    let data: CurrentResults = {
      columns: columns,
      results: results,
      name: selectedView?.name,
    };
    navigate(RouterPath.CREATE_CHART, {
      state: {
        view: selectedView,
        results: data,
      },
    });
  };

  useEffect(() => {
    const getViews = () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        window.location.href = RouterPath.LOGIN;
      } else {
        setToken(token);
        DefaultService.currentUserUserAuthCurrentUserGet(token)
          .then((response: User) => {
            setCurrentUser(response);
            DefaultService.viewsQueryViewsGet(token).then((response) => {
              setViews(response);
            });
          })
          .catch((error) => {
            window.location.href = RouterPath.LOGIN;
          });
      }
    };
    // Run once immediately and then set the interval
    getViews(); // To ensure it runs immediately the first time
    const interval = setInterval(() => {
      if (requestCount < requestLimit) {
        getViews();
        setRequestCount(requestCount + 1);
      } else {
        clearInterval(interval);
      }
    }, 5000); // Run every 5 seconds

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedView) {
      DefaultService.tableResultsQueryTableResultsGet(
        token,
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
        <div className="col-span-1">
          <SideBar currentUser={currentUser} />
        </div>
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
                    hanldeChartClick={hanldeChartClick}
                    firstSource={true}
                  />
                  <StickyHeadTable results={results} columns={columns} />
                </>
              ) : (
                views.map((view: ViewInDB, index) => (
                  <BaseView
                    view={view}
                    setSelectedView={setSelectedView}
                    selected={false}
                    hanldeChartClick={hanldeChartClick}
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
