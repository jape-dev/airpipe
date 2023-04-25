import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Screens/Home";
import { SignUp } from "./Screens/SignUp";
import { Login } from "./Screens/Login";
import { Welcome } from "./Screens/Welcome";
import { Blender } from "./Screens/Blender";
import { Connect } from "./Screens/Connect";
import { OpenAPI } from "./vizoApi";
import { ProtectedRoute } from "./Components/ProtectedRoute";

export const RouterPath = {
  HOME: "/",
  SHARE: "/share/",
  LOGIN: "/login/",
  SIGNUP: "/signup/",
  WELCOME: "/welcome/",
  BLENDER: "/blender/",
  CONNECT: "/connect/",
};

function App() {
  OpenAPI.BASE = process.env.REACT_APP_DOMAIN_URL || "http://localhost:8000";

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
        <Route path={RouterPath.BLENDER} element={<Blender />} />
        <Route path={RouterPath.CONNECT} element={<Connect />} />
      </Routes>
    </Router>
  );
}

export default App;
