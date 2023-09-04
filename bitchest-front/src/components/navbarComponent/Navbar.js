import React, { useState } from "react";
import axios from "axios";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavbarComponent({ isLoggedIn, onLogout, userRole }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

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
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard" className="navbar-brand-custom">
            BitChest
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            {isLoggedIn && (
              <>
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/dashboard">
                    Tableau de bord
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cryptos">
                    Consultation des cours des crypto monnaies
                  </Nav.Link>
                  {userRole === "client" && (
                    <Nav.Link as={Link} to="/wallet">
                      Gérer le portefeuille
                    </Nav.Link>
                  )}
                  <Nav.Link as={Link} to="/data">
                    Gérer leur donnée personnelle
                  </Nav.Link>
                  {userRole === "admin" && (
                    <Nav.Link as={Link} to="/clients">
                      Gérer les clients
                    </Nav.Link>
                  )}
                </Nav>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
