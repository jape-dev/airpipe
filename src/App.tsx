import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Screens/Home";
import { SignUp } from "./Screens/SignUp";
import { Login } from "./Screens/Login";
import { OpenAPI } from "./vizoApi";
import { ProtectedRoute } from "./Components/ProtectedRoute";

export const RouterPath = {
  HOME: "/",
  SHARE: "/share/",
  LOGIN: "/login/",
  SIGNUP: "/signup/",
};

function App() {
  OpenAPI.BASE =
    process.env.REACT_APP_DOMAIN_URL || "https://airpipe-api.onrender.com";

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
      </Routes>
    </Router>
  );
}

export default App;
