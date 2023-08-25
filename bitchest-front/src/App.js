import React, { useState } from "react";
import Navbar from "./components/Navbar"; // Importez le composant Navbar
import LoginPage from "./pages/LoginPage"; // Importez le composant LoginPage
import DashboardPage from "./pages/DashboardPage";
import ManageUsers from "./components/ManageUsers"; // Importez le composant ManageUsers

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // Ajoutez l'état pour le rôle de l'utilisateur

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Enregistrez le rôle de l'utilisateur lors de la connexion
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(""); // Réinitialisez le rôle de l'utilisateur lors de la déconnexion
  };

  return (
    <div className="App">
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />} {/* Utilisez le composant Navbar uniquement si l'utilisateur est connecté */}
      <div className="container">
        {isLoggedIn ? (
          userRole === "admin" ? <DashboardPage /> : <ManageUsers role={userRole} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
