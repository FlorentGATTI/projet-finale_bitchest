import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Button, Image, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCoins, faWallet, faUser, faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavbarComponent({ isLoggedIn, onLogout, userRole, userBalance }) {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);

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

  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        // Si l'utilisateur défile de plus de 0px, fermez la navbar
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Ce code est exécuté lorsque le composant est démonté
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Le tableau vide signifie que cet effet ne s'exécutera qu'une fois (comparable à componentDidMount)

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
          <Navbar.Collapse style={{ display: 'block' }}> {/* Forcer l'affichage des liens */}
            <Nav className="navbar-content mr-auto">
              <Nav.Link as={Link} to="/dashboard">
                <FontAwesomeIcon icon={faHome} size="lg" />
                Acceuil
              </Nav.Link>
              <Nav.Link as={Link} to="/cryptos">
                <FontAwesomeIcon icon={faCoins} size="lg" />
                Cryptomonnaie
              </Nav.Link>
              {userRole === "client" && (
                <Nav.Link as={Link} to="/wallet">
                  <FontAwesomeIcon icon={faWallet} size="lg" />
                  Portefeuille
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/data">
                <FontAwesomeIcon icon={faUser} size="lg" />
                Mon compte
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
      {userRole === "client" && (
        <Link to="/wallet" className="balance-banner">
          Solde: {userBalance} EUR
        </Link>
      )}{" "}
    </div>
  );
}

export default NavbarComponent;
