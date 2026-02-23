import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import keycloak from "../keycloak.js";
import "./App.css";
import DuckListPage from "./components/pages/DuckListPage.jsx";
import UserStatus from "./components/userStatus.jsx";

function App() {
  useEffect(() => console.log(keycloak), []);

  return (
    <>
   <UserStatus/>
      <Router>
        <Routes>
          // where is this page, swap based on url
          <Route path="/" element={<DuckListPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
