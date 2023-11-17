import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

  return (
    <Router>
      <Routes>
        <Route
          path={RouterPath.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={RouterPath.LOGIN} element={<Login />} />
        <Route path={RouterPath.SIGNUP} element={<SignUp />} />
        <Route path={RouterPath.WELCOME} element={<Welcome />} />
        <Route path={RouterPath.ADD_DATA} element={<AddData />} />
        <Route path={RouterPath.ADD_DATA_SOURCE} element={<AddDataSource />} />
        <Route path={RouterPath.CONNECT} element={<Connect />} />
        <Route path={RouterPath.DATA_SOURCES} element={<DataSources />} />
        <Route path={RouterPath.ASK} element={<Ask />} />
        <Route path={RouterPath.GOOGLE_SHEETS} element={<GoogleSheets />} />
        <Route path={RouterPath.CREATE_VIEW} element={<CreateView />} />
        <Route path={RouterPath.VIEWS} element={<Views />} />
      </Routes>
    </Router>
  );
}

export default App;
