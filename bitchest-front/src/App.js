import React, { useState } from "react";
import Navbar from "./components/Navbar"; // Importez le composant Navbar
import LoginPage from "./pages/LoginPage"; // Importez le composant LoginPage
import DashboardPage from "./pages/DashboardPage";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />} {/* Utilisez le composant Navbar uniquement si l'utilisateur est connecté */}
      <div className="container">
        {isLoggedIn ? <DashboardPage /> : <LoginPage onLogin={handleLogin} />}
      </div>
    </div>
  );
}

export default App;
