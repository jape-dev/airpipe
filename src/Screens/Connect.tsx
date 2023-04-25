import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { GoogleConnectorV2 } from "../Components/GoogleConnectorV2";
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
          console.log(response);
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
      <div className="bg-gray-200 p-4 mx-auto my-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Data Sources</h1>
        <GoogleConnectorV2 currentUser={currentUser} />
        <FacebookConnectorV2 currentUser={currentUser} />
      </div>
    </>
  );
};
