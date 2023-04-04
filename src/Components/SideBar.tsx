import { DefaultService, User, Schema, TabData } from "../vizoApi";
import { useEffect, useState } from "react";
import { RouterPath } from "../App";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import { GoogleConnector } from "./GoogleConnector";
import { FacebookConnector } from "./FacebookConnector";

export const SideBar = (props: {
  tableNameList: string[][];
  setTableNameList: React.Dispatch<React.SetStateAction<string[][]>>;
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  updateSchema: (tabData: TabData) => void;
  setIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  setQueryList: React.Dispatch<React.SetStateAction<string[][]>>;
  resultsList: Object[][];
  setResultsList: React.Dispatch<React.SetStateAction<object[][][]>>;
  facebookTabCount: number;
  setFacebookTabCount: React.Dispatch<React.SetStateAction<number>>;
  googleTabCount: number;
  setGoogleTabCount: React.Dispatch<React.SetStateAction<number>>;
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
        tableNameList={props.tableNameList}
        setTableNameList={props.setTableNameList}
        tabIndex={props.tabIndex}
        setTabIndex={props.setTabIndex}
        updateSchema={props.updateSchema}
        setIndexList={props.setIndexList}
        setQueryList={props.setQueryList}
        setResultsList={props.setResultsList}
        tabCount={props.googleTabCount}
        setTabCount={props.setGoogleTabCount}
      />
      <FacebookConnector
        currentUser={currentUser}
        tableNameList={props.tableNameList}
        setTableNameList={props.setTableNameList}
        tabIndex={props.tabIndex}
        setTabIndex={props.setTabIndex}
        updateSchema={props.updateSchema}
        setIndexList={props.setIndexList}
        setQueryList={props.setQueryList}
        setResultsList={props.setResultsList}
        tabCount={props.facebookTabCount}
        setTabCount={props.setFacebookTabCount}
      />
    </div>
  );
};
