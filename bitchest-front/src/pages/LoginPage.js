import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    await axios.get("http://localhost:8000/sanctum/csrf-cookie")
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      });

      console.log("test", response);
      if (response.status === 202) {
        // Connexion réussie, utilisez le jeton d'authentification
        console.log("Connexion réussie", response.data.token);
        onLogin(); // Appelle la fonction onLogin passée en tant que props
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
