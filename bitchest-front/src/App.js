import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Navbar from "./components/navbarComponent/Navbar";
import LoginPage from "./pages/loginPage/Login";
import Dashboard from "./pages/dashboardPage/Dashboard";
import CryptoConsultation from "./pages/cryptoConsultationPage/CryptoConsultation";
import DataPersonel from "./pages/dataClientPage/DataClient";
import ManageClients from "./pages/manageClientsPage/ManageClients";
import Wallet from "./pages/walletPage/Wallet";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const initialLoginStatus = localStorage.getItem("isLoggedIn") === "true";
  const initialRole = localStorage.getItem("userRole") || "";

  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);
  const [userRole, setUserRole] = useState(initialRole);
  const [userBalance, setUserBalance] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  axios.defaults.withCredentials = true;

  const fetchUserBalance = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/wallet/balance");
      setUserBalance(response.data.balance);
    } catch (error) {
      console.error("Erreur lors de la récupération du solde de l'utilisateur:", error);
      if (error.response && error.response.status === 429) {
        setErrorMessage("Vous avez fait trop de requêtes. Veuillez attendre un moment et réessayer.");
      } else {
        setErrorMessage("Une erreur est survenue lors de la récupération des données.");
      }
    }
  }, []);

  const handleLogin = useCallback(
    (role) => {
      setIsLoggedIn(true);
      setUserRole(role);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);

      fetchUserBalance();
    },
    [fetchUserBalance]
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUserBalance("");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userRole");
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserBalance();
    }
  }, [isLoggedIn, fetchUserBalance]);

  return (
    <Router>
      <div className="App container">
        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
            {errorMessage}
          </Alert>
        )}
        {isLoggedIn && <Navbar onLogout={handleLogout} userRole={userRole} updateUserBalance={fetchUserBalance} userBalance={userBalance} />}
        <div className="content">
          <Routes>
            <Route path="/" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route path="/cryptos" element={isLoggedIn ? <CryptoConsultation userRole={userRole} updateUserBalance={fetchUserBalance}/> : <Navigate to="/" replace />} />
            <Route path="/wallet" element={isLoggedIn ? <Wallet userBalance={userBalance} updateUserBalance={fetchUserBalance} /> : <Navigate to="/" replace />} />
            <Route path="/data" element={isLoggedIn ? <DataPersonel /> : <Navigate to="/" replace />} />
            <Route path="/clients" element={isLoggedIn && userRole === "admin" ? <ManageClients /> : <Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
