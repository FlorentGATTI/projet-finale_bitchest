import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
  const [userRole, setUserRole] = useState("");
  const [userBalance, setUserBalance] = useState(""); 

  console.log("Userrole", userRole);

  const fetchUserBalance = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/wallet/balance");
      console.log("Réponse du backend: setUserBalance", response.data.balance);
      setUserBalance(response.data.balance);
    } catch (error) {
      console.error("Erreur lors de la récupération du solde de l'utilisateur:", error);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserBalance();
    }
  }, [isLoggedIn, userRole, fetchUserBalance]);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    fetchUserBalance(); // Obtenez le solde de l'utilisateur après la connexion
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUserBalance(""); // Réinitialisez le solde lors de la déconnexion
  };

  const isAdmin = userRole === "admin";

  return (
    <Router>
      <div className="App container">
        {isLoggedIn && <Navbar onLogout={handleLogout} userRole={userRole} userBalance={userBalance} />}
        <div className="content">
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route path="/cryptos" element={isLoggedIn ? <CryptoConsultation userRole={userRole} /> : null} />
            <Route path="/wallet" element={isLoggedIn ? <Wallet userRole={userRole} /> : null} />
            <Route path="/data" element={isLoggedIn ? <DataPersonel /> : null} />
            <Route path="/clients" element={isLoggedIn && isAdmin ? <ManageClients /> : null} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
