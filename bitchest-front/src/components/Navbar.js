import React from "react";
import axios from "axios";
import { Navbar, Nav, Button } from "react-bootstrap";

function NavbarComponent({ isLoggedIn, onLogout }) {
  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post("http://localhost:8000/logout");
      onLogout();
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
          <Nav className="ml-auto">
            {isLoggedIn && (
              <Nav.Item>
                <Button variant="link" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
