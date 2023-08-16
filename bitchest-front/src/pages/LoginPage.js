import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ici, vous pouvez effectuer une requête à votre backend pour la vérification des informations de connexion
    // Par exemple, si les informations sont valides, vous pourriez rediriger l'utilisateur vers son espace privé
    if (email === 'user@example.com' && password === 'password') {
      setError('');
      alert('Connexion réussie ! Redirection vers l\'espace privé...');
    } else {
      setError('Adresse email ou mot de passe incorrect');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '350px' }}>
        <h2 className="text-center mb-4">Connexion</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Adresse Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
