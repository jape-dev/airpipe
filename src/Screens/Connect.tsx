import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { GoogleConnectorV2 } from "../Components/GoogleConnectorV2";
import { GoogleAnalyticsConnector } from "../Components/GoogleAnalyticsConnector";
import { FacebookConnectorV2 } from "../Components/FacebookConnectorV2";

import { DefaultService } from "../vizoApi";
import { User } from "../vizoApi";
import { RouterPath } from "../App";

export const Connect: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar currentUser={currentUser} />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-1">Connectors</h1>
            <p className="mb-4 mt-0text-sm leading-5 text-gray-500">
              Get started by securely authenticating and connecting to your
              marketing channels.
            </p>
            <GoogleConnectorV2 currentUser={currentUser} />
            <FacebookConnectorV2 currentUser={currentUser} />
            <GoogleAnalyticsConnector currentUser={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
};
