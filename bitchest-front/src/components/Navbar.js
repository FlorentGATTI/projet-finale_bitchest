import React from "react";
import axios from "axios";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarComponent.css";

function NavbarComponent({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post("http://localhost:8000/logout");
      onLogout();
      navigate("/");
    } catch (error) {
      console.error("Une erreur est survenue lors de la déconnexion", error);
    }
  };

  return (
    <div className="navbar-container">
      <Navbar expand="lg" className="flex-column">
        <Navbar.Brand href="#home">BitChest</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="links-container">
            <Nav className="flex-column">
              {isLoggedIn && (
                <Nav.Item>
                  <Link to="/dashboard" className="nav-link">
                    Tableau de bord
                  </Link>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item>
                  <Link to="/cryptos" className="nav-link">
                    Consultation des cours
                  </Link>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item>
                  <Link to="/clients" className="nav-link">
                    Gérer les clients
                  </Link>
                </Nav.Item>
              )}
            </Nav>
            {isLoggedIn && (
              <div className="button-deco">
                <Button variant="dark" onClick={handleLogout} className="logout-btn">
                  Déconnexion
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
