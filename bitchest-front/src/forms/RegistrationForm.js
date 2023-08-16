import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation des champs
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Ici, vous pouvez ajouter la logique d'inscription
    // Par exemple, vous pouvez appeler une API pour enregistrer les données d'inscription

    setErrorMessage(""); // Réinitialiser le message d'erreur si nécessaire
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '80vh', overflow: 'hidden' }}>
      <div className="w-25">
        <h2 className="mb-4">Inscription</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Adresse Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%' }}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirmer le mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '100%' }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            S'inscrire
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default RegistrationForm;
