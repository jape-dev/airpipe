import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Screens/Home";
import { SignUp } from "./Screens/SignUp";
import { Login } from "./Screens/Login";
import { Welcome } from "./Screens/Welcome";
import { AddData } from "./Screens/AddData";
import { Connect } from "./Screens/Connect";
import { DataSources } from "./Screens/DataSources";
import { Ask } from "./Screens/Ask";
import { OpenAPI } from "./vizoApi";
import { ProtectedRoute } from "./Components/ProtectedRoute";

export const RouterPath = {
  HOME: "/",
  SHARE: "/share/",
  LOGIN: "/login/",
  SIGNUP: "/signup/",
  WELCOME: "/welcome/",
  ADD_DATA: "/add-data/",
  CONNECT: "/connect/",
  DATA_SOURCES: "/data-sources/",
  ASK: "/ask/",
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
        <Route path={RouterPath.CONNECT} element={<Connect />} />
        <Route path={RouterPath.DATA_SOURCES} element={<DataSources />} />
        <Route path={RouterPath.ASK} element={<Ask />} />
      </Routes>
    </Router>
  );
}

export default App;
