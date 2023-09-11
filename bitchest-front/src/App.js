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

function handleLogin(role, setIsLoggedIn, setUserRole, fetchUserBalance) {
  setIsLoggedIn(true);
  setUserRole(role);
  fetchUserBalance();
  localStorage.setItem("isLoggedIn", "true");
}

function handleLogout(setIsLoggedIn, setUserRole, setUserBalance) {
  setIsLoggedIn(false);
  setUserRole("");
  setUserBalance("");
  localStorage.setItem("isLoggedIn", "false");
}

function WithAuthentication({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  const initialLoginStatus = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);
  const [userRole, setUserRole] = useState("");
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
        {isLoggedIn && <Navbar onLogout={() => handleLogout(setIsLoggedIn, setUserRole, setUserBalance)} userRole={userRole} updateUserBalance={fetchUserBalance} userBalance={userBalance} />}
        <div className="content">
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={!isLoggedIn ? <LoginPage onLogin={(role) => handleLogin(role, setIsLoggedIn, setUserRole, fetchUserBalance)} /> : <Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <WithAuthentication isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </WithAuthentication>
              }
            />
            <Route
              path="/cryptos"
              element={
                <WithAuthentication isLoggedIn={isLoggedIn}>
                  <CryptoConsultation userRole={userRole} />
                </WithAuthentication>
              }
            />
            <Route
              path="/wallet"
              element={
                <WithAuthentication isLoggedIn={isLoggedIn}>
                  <Wallet userBalance={userBalance} updateUserBalance={fetchUserBalance} />
                </WithAuthentication>
              }
            />
            <Route
              path="/data"
              element={
                <WithAuthentication isLoggedIn={isLoggedIn}>
                  <DataPersonel />
                </WithAuthentication>
              }
            />
            <Route path="/admin" element={<WithAuthentication isLoggedIn={isLoggedIn}>{userRole === "admin" ? <ManageClients /> : <Navigate to="/dashboard" replace />}</WithAuthentication>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
