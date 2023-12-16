import "./App.css";
import React, { useState, useEffect } from "react";
import { withMobileWarning } from "./Utils/mobileWarning";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Home } from "./Screens/Home";
import { SignUp } from "./Screens/SignUp";
import { Login } from "./Screens/Login";
import { Welcome } from "./Screens/Welcome";
import { AddData } from "./Screens/AddData";
import { AddDataSource } from "./Screens/AddDataSource";
import { Connect } from "./Screens/Connect";
import { DataSources } from "./Screens/DataSources";
import { Ask } from "./Screens/Ask";
import { CreateView } from "./Screens/CreateView";
import { GoogleSheets } from "./Screens/GoogleSheets";
import { Views } from "./Screens/Views";
import { OpenAPI } from "./vizoApi";
import { OpenAPI as dataHeraldOpenAPI } from "./dataHeraldApi";
import { ProtectedRoute } from "./Components/ProtectedRoute";

export const RouterPath = {
  HOME: "/",
  SHARE: "/share/",
  LOGIN: "/login/",
  SIGNUP: "/signup/",
  WELCOME: "/welcome/",
  ADD_DATA: "/add-data/",
  ADD_DATA_SOURCE: "/add-data-source/",
  CONNECT: "/connect/",
  DATA_SOURCES: "/data-sources/",
  ASK: "/ask/",
  LOOKER: "/looker/",
  GOOGLE_SHEETS: "/google-sheets/",
  CREATE_VIEW: "/create-view/",
  VIEWS: "/views/",
};

function App() {
  OpenAPI.BASE = process.env.REACT_APP_DOMAIN_URL || "https://api-airpipe.com";
  dataHeraldOpenAPI.BASE =
    process.env.REACT_APP_DATA_HERALD_API || "https://dataherald.onrender.com";

  return (
    <>
      <Router>
        <Routes>
          <Route
            path={RouterPath.HOME}
            element={withMobileWarning(
              ProtectedRoute,
              true
            )({ children: <Home /> })}
          />
          <Route
            path={RouterPath.LOGIN}
            element={withMobileWarning(Login, false)({ children: <Login /> })}
          />
          <Route
            path={RouterPath.SIGNUP}
            element={withMobileWarning(SignUp, false)({ children: <SignUp /> })}
          />
          <Route
            path={RouterPath.WELCOME}
            element={withMobileWarning(
              Welcome,
              true
            )({ children: <Welcome /> })}
          />
          <Route
            path={RouterPath.ADD_DATA}
            element={withMobileWarning(
              AddData,
              true
            )({ children: <AddData /> })}
          />
          <Route
            path={RouterPath.ADD_DATA_SOURCE}
            element={withMobileWarning(
              AddDataSource,
              true
            )({ children: <AddDataSource /> })}
          />
          <Route
            path={RouterPath.CONNECT}
            element={withMobileWarning(
              Connect,
              true
            )({ children: <Connect /> })}
          />
          <Route
            path={RouterPath.DATA_SOURCES}
            element={withMobileWarning(
              DataSources,
              true
            )({ children: <DataSources /> })}
          />
          <Route
            path={RouterPath.ASK}
            element={withMobileWarning(Ask, true)({ children: <Ask /> })}
          />
          <Route
            path={RouterPath.GOOGLE_SHEETS}
            element={withMobileWarning(
              GoogleSheets,
              true
            )({ children: <GoogleSheets /> })}
          />
          <Route
            path={RouterPath.CREATE_VIEW}
            element={withMobileWarning(
              CreateView,
              true
            )({ children: <CreateView /> })}
          />
          <Route
            path={RouterPath.VIEWS}
            element={withMobileWarning(Views, true)({ children: <Views /> })}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
