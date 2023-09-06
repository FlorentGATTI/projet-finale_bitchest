import React, { useState } from "react";
import { Form, Button, Container, Alert, Image, Row, Col } from "react-bootstrap";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (response.status === 202) {
        console.log("Connexion réussie", response.data.token);   
        onLogin(response.data.user.role);
      } else {
        setError("Erreur de connexion: " + response.data.message);
      }
    } catch (error) {
      setError("Mot de passe ou email incorrect");
      console.error("Une erreur est survenue", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center bg-dark" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Row className="justify-content-center mb-4">
          <Col xs="auto">
            <Image src="/assets/images/bitchest_logo.png" alt="Bitchest Logo" fluid />
          </Col>
          <Col xs="auto">
            <h2 style={{ color: "#01F593" }}>Connexion</h2>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label style={{ color: "#01F593" }}>Adresse Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label style={{ color: "#01F593" }}>Mot de passe</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          <Button variant="success" type="submit" className="w-100 mt-3">
            Se connecter
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
