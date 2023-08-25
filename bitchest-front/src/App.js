import React, { useState } from "react";
import Navbar from "./components/Navbar"; // Importez le composant Navbar
import LoginPage from "./pages/LoginPage"; // Importez le composant LoginPage
import DashboardPage from "./pages/DashboardPage";
import CryptoConsultation from "./pages/CryptoConsultation";
import ManageUsers from "./components/ManageUsers"; // Importez le composant ManageUsers
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // Ajoutez l'état pour le rôle de l'utilisateur

  console.log('Userrole', userRole);
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Enregistrez le rôle de l'utilisateur lors de la connexion
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(""); // Réinitialisez le rôle de l'utilisateur lors de la déconnexion
  };
  
  const isAdmin = userRole === "admin";

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        <div className="container">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/" replace />} />
            <Route path="/cryptos" element={isLoggedIn ? <CryptoConsultation /> : null} />
            <Route path="/clients" element={isLoggedIn && isAdmin ? <ManageUsers /> : null} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
