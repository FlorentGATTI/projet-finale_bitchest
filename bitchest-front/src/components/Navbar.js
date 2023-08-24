import React from "react";
import axios from "axios";

function NavbarComponent({ isLoggedIn, onLogout }) {
  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post("http://localhost:8000/logout");
      onLogout();
      console.log('deco', onLogout());
    } catch (error) {
      console.error("Une erreur est survenue lors de la déconnexion", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#home">
          BitChest
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn nav-link" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
