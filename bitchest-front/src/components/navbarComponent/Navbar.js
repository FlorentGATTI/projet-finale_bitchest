import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Button, Image, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCoins, faWallet, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavbarComponent({ isLoggedIn, onLogout, userRole, userBalance }) {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      const shouldShowElements = currentScrollPos < lastScrollPos || currentScrollPos <= 50;
      setShowBalance(shouldShowElements);
      setShowNavbar(shouldShowElements);

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);

  return (
    <div className="navbar-container" style={{ left: showNavbar ? "0" : "-100%" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="sidebar-nav">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard">
            <Image src="./assets/images/bitchest_logo.png" alt="BitChest Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="navbar-content mr-auto">
              <Nav.Link as={Link} to="/dashboard">
                <FontAwesomeIcon icon={faHome} size="lg" />
                Tableau de bord
              </Nav.Link>
              <Nav.Link as={Link} to="/cryptos">
                <FontAwesomeIcon icon={faCoins} size="lg" />
                Consultation des cours
              </Nav.Link>
              {userRole === "client" && (
                <Nav.Link as={Link} to="/wallet">
                  <FontAwesomeIcon icon={faWallet} size="lg" />
                  Gérer le portefeuille
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/data">
                <FontAwesomeIcon icon={faUser} size="lg" />
                Donnée personnelle
              </Nav.Link>
              {userRole === "admin" && (
                <Nav.Link as={Link} to="/clients">
                  <FontAwesomeIcon icon={faUsers} size="lg" />
                  Gérer les clients
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-danger" onClick={handleLogout} className="logout-btn">
            Déconnexion
          </Button>
        </Container>
      </Navbar>
      {userRole === "client" && showBalance && <div className="balance-banner">Solde: {userBalance} EUR</div>}
    </div>
  );
}

export default NavbarComponent;
