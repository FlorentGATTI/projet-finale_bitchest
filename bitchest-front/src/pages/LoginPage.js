import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Connexion réussie, utilisez le jeton d'authentification
        console.log("Connexion réussie", response.data.token);
      } else {
        // Erreur de connexion
        console.error("Erreur de connexion", response.data.message);
      }
    } catch (error) {
      console.error("Une erreur est survenue", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="w-100" style={{ maxWidth: "350px" }}>
        <h2 className="text-center mb-4">Connexion</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Adresse Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          {error && <div className="text-danger mb-3">{error}</div>}
          <Button variant="primary" type="submit" className="w-50 mt-3">
            Se connecter
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
