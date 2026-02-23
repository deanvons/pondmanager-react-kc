import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import keycloak from "../keycloak.js";
import "./App.css";
import DuckListPage from "./components/pages/DuckListPage.jsx";
import UserStatus from "./components/userStatus.jsx";
import ProfessorProfilePage from "./components/pages/ProfessorProfilePage.jsx";
import authGuard from "./components/guards/authGuard.jsx";
const ProtectedProfilePage = authGuard(ProfessorProfilePage);
function App() {
  useEffect(() => console.log(keycloak), []);

  return (
    <>
      <Router>
        <UserStatus />
        <Routes>
          <Route path="/" element={<DuckListPage />} />
          <Route path="/profile" element={<ProtectedProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
