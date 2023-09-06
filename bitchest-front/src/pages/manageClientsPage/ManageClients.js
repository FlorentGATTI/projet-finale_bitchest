import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ListGroup, Form, Button } from "react-bootstrap";
import "./ManageClients.css";

function ManageClients() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/manage-clients");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const handleUserSelect = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setSelectedUserId(user.id);
  };

  const handleUpdateUser = async () => {
    if (!selectedUserId) return;
    try {
      await axios.put(`http://localhost:8000/api/manage-clients/${selectedUserId}`, {
        name,
        email,
        role,
      });
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      await axios.delete(`http://localhost:8000/api/manage-clients/${selectedUserId}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:8000/api/manage-clients", {
        name,
        email,
        role,
      });
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
  };

  return (
    <Container className="manage-clients-container bg-dark text-white">
      <h2 className="py-5">Gérer les clients</h2>

      {/* Liste des utilisateurs */}
      <div className="user-list" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3>Liste des utilisateurs</h3>
        <ListGroup variant="flush" style={{ width: "50%" }}>
          {users.map((user) => (
            <ListGroup.Item key={user.id} action onClick={() => handleUserSelect(user)}>
              {user.name} - {user.email} - {user.role}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* Modification de l'utilisateur */}
      <div className="user-details mt-5" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3>Modifier un utilisateur</h3>
        <Form style={{ width: "50%" }}>
          <Form.Group>
            <Form.Label>Nom :</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Rôle :</Form.Label>
            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>

          <Button className="mr-2 my-4" variant="primary" onClick={handleUpdateUser}>
            Mettre à jour
          </Button>
          <Button className="mr-2" variant="danger" onClick={handleDeleteUser}>
            Supprimer
          </Button>
          <Button variant="success" onClick={handleAddUser}>
            Ajouter
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default ManageClients;
