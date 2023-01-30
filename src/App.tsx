import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Screens/Home";
import { SignUp } from "./Screens/SignUp";
import { Login } from "./Screens/Login";
import { OpenAPI } from "./vizoApi";

export const RouterPath = {
  HOME: "/",
  SHARE: "/share/",
  LOGIN: "/login/",
  SIGNUP: "/signup/",
};

function App() {
  OpenAPI.BASE = "http://localhost:8000";

  return (
    <Router>
      <Routes>
        <Route path={RouterPath.HOME} element={<Home />} />
        <Route path={RouterPath.LOGIN} element={<Login />} />
        <Route path={RouterPath.SIGNUP} element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
