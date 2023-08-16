import React from "react";
import Navbar from "./components/Navbar"; // Importez le composant Navbar
import LoginPage from "./pages/LoginPage"; // Importez le composant LoginPage
import RegistrationForm from "./forms/RegistrationForm"; // Importez le composant LoginPage

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Utilisez le composant Navbar */}
      <div className="container">
        {/* <LoginPage /> */}
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
