import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Screens/Home";
import { OpenAPI } from "./vizoApi";

export const RouterPath = {
  HOME: "/",
};

function App() {
  OpenAPI.BASE = "http://localhost:8000";

  return (
    <Router>
      <Routes>
        <Route path={RouterPath.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
