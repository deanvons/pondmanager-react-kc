import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import keycloak from "../keycloak.js";
import "./App.css";
import DuckListPage from "./components/pages/DuckListPage.jsx";
import UserStatus from "./components/userStatus.jsx";
import ProfessorProfilePage from "./components/pages/ProfessorProfilePage.jsx";
import authGuard from "./components/guards/authGuard.jsx";
import DuckRegisterPage from "./components/pages/DuckRegisterPage.jsx";
import wranglerGuard from "./components/guards/DuckWranglerGuard.jsx";
const ProtectedProfilePage = authGuard(ProfessorProfilePage);
const ProtectedDuckRegisterPage = wranglerGuard(DuckRegisterPage);
function App() {
  useEffect(() => console.log(keycloak), []);

  return (
    <>
      <Router>
        <UserStatus />
        <Routes>
          <Route path="/" element={<DuckListPage />} />
          <Route path="/profile" element={<ProtectedProfilePage />} />
          <Route path="/duckform" element={< ProtectedDuckRegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
