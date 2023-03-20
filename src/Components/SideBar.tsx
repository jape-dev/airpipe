import { DefaultService, User } from "../vizoApi";
import { useEffect, useState } from "react";
import { RouterPath } from "../App";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import { GoogleConnector } from "./GoogleConnector";
import { FacebookConnector } from "./FacebookConnector";

export const SideBar = (props: {
  setResults: React.Dispatch<React.SetStateAction<Object[][]>>;
}) => {
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
    <div className="w-full h-full relative pt-8 border-2 bg-white border-white border-r-neutral-200">
      <p className="text-lg pl-8 pr-8 font-semibold">Data Sources</p>
      <GoogleConnector
        currentUser={currentUser}
        setResults={props.setResults}
      />
      <FacebookConnector
        currentUser={currentUser}
        setResults={props.setResults}
      />
    </div>
  );
};
