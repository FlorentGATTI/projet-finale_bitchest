import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Modal } from "react-bootstrap";
import "./DataClient.css";

function DataClient() {
  const [userData, setUserData] = useState({ name: "", email: "", role: "" });
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    fetchUserData();
  }, []);

  const axiosInstance = axios.create();

  // Intercepter les réponses et attendre en cas d'erreur 429
  axiosInstance.interceptors.response.use(null, (error) => {
    if (error.config && error.response && error.response.status === 429) {
      // Doublez le délai à chaque tentative, avec un maximum de 5 secondes
      const retryDelay = Math.min(error.config.retryDelay * 2, 5000);

      // Réessayer la requête après le délai
      return new Promise((resolve) => {
        setTimeout(() => resolve(axiosInstance(error.config)), retryDelay);
      });
    }

    // Si ce n'est pas une erreur 429, renvoyez une promesse rejetée
    return Promise.reject(error);
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/current-user");
      setUserData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:8000/api/manage-clients/${userData.id}`, userData);
      alert("Données mises à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== passwordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/manage-clients/${userData.id}`, {
        password: newPassword,
      });
      alert("Mot de passe changé avec succès !");
      setShowModal(false);
      setNewPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
    }
  };

  return (
    
    <Container className="data-personel-container bg-dark text-white" style={{ minHeight: "100vh" }}>
      <h2 className="py-5">Gérer mes données personnelles</h2>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <div className="user-details mt-5" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3>Modifier mes données personnelles</h3>
        <Form style={{ width: "300px" }}>
          <Form.Group>
            <Form.Label>Nom :</Form.Label>
            <Form.Control type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} style={{ textAlign: "center" }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} style={{ textAlign: "center" }} />
          </Form.Group>

          <Button className="mr-2 my-3" onClick={handleUpdateUser}>
            Mettre à jour
          </Button>
          <Button variant="warning" onClick={() => setShowModal(true)}>
            Changer le mot de passe
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Changer le mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handlePasswordChange}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DataClient;
