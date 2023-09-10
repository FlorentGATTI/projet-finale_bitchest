import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Button, Image, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCoins, faWallet, faUser, faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavbarComponent({ onLogout, userRole, userBalance }) {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showBalanceBanner, setShowBalanceBanner] = useState(true); // Nouvel état
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

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

  const toggleNavbar = () => setShowNavbar((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollPosition && window.scrollY > 20) {
        // L'utilisateur a fait défiler vers le bas
        setShowBalanceBanner(false);
      } else if (window.scrollY < lastScrollPosition) {
        // L'utilisateur a fait défiler vers le haut
        setShowBalanceBanner(true);
      }
      setLastScrollPosition(window.scrollY); // Mettre à jour la position du défilement
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  return (
    <div className="navbar-container" style={{ left: showNavbar ? "0" : "-100%" }}>
      <div className="navbar-trigger" onClick={toggleNavbar}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>
      <Navbar bg="dark" variant="dark" expand={false} className="sidebar-nav">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard">
            <Image src="/assets/images/bitchest_logo.png" alt="BitChest Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Collapse style={{ display: "block" }}>
            <Nav className="navbar-content mr-auto">
              <Nav.Link as={Link} to="/dashboard">
                <FontAwesomeIcon icon={faHome} size="lg" /> Acceuil
              </Nav.Link>
              <Nav.Link as={Link} to="/cryptos">
                <FontAwesomeIcon icon={faCoins} size="lg" /> Cryptomonnaie
              </Nav.Link>
              {userRole === "client" && (
                <Nav.Link as={Link} to="/wallet">
                  <FontAwesomeIcon icon={faWallet} size="lg" /> Portefeuille
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/data">
                <FontAwesomeIcon icon={faUser} size="lg" /> Mon compte
              </Nav.Link>
              {userRole === "admin" && (
                <Nav.Link as={Link} to="/clients">
                  <FontAwesomeIcon icon={faUsers} size="lg" /> Gérer les clients
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-danger" onClick={handleLogout} className="logout-btn">
            Déconnexion
          </Button>
        </Container>
      </Navbar>
      {userRole === "client" && userBalance !== null && showBalanceBanner && (
        <Link to="/wallet" className="balance-banner">
          Solde: {userBalance} EUR
        </Link>
      )}
    </div>
  );
}

export default NavbarComponent;
