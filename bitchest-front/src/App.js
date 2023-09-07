import React, { useState } from "react";
import Navbar from "./components/navbarComponent/Navbar"; // Importez le composant Navbar
import LoginPage from "./pages/loginPage/Login"; // Importez le composant LoginPage
import Dashboard from "./pages/dashboardPage/Dashboard";
import CryptoConsultation from "./pages/cryptoConsultationPage/CryptoConsultation";
import DataPersonel from "./pages/dataClientPage/DataClient";
import ManageClients from "./pages/manageClientsPage/ManageClients"; // Importez le composant ManageUsers
import Wallet from "./pages/walletPage/Wallet"; // Importez le composant ManageUsers


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
      <div className="App container">
        {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userRole={userRole} userBalance={2500}/>}
        <div className="content">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route path="/cryptos" element={isLoggedIn ? <CryptoConsultation userRole={userRole} /> : null} />
            <Route path="/wallet" element={isLoggedIn ? <Wallet /> : null} />
            <Route path="/data" element={isLoggedIn ? <DataPersonel /> : null} />
            <Route path="/clients" element={isLoggedIn && isAdmin ? <ManageClients /> : null} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
