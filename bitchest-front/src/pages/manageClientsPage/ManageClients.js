import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Select from "react-select";
import "./ManageClients.css";

function ManageClients() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [password, setPassword] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // réinitialise le formulaire
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("client");
    setSelectedUserId(null);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/manage-clients");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const handleUserSelect = (selectedOption) => {
    console.log("handleUserSelect called with:", selectedOption);

    const { name = "", email = "", role = "client", id = null } = selectedOption.value;
    setName(name);
    setEmail(email);
    setRole(role);
    setSelectedUserId(id);
    setPassword(""); 
  };

  const handleUpdateUser = async () => {
    if (!selectedUserId) return;
    const payload = {
      name,
      email,
      role,
    };
    if (password) {
      payload.password = password;
    }

    try {
      await axios.put(`http://localhost:8000/api/manage-clients/${selectedUserId}`, payload);
      fetchUsers();
      setFeedback("Utilisateur mis à jour avec succès !");
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      setFeedback("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await axios.delete(`http://localhost:8000/api/manage-clients/${selectedUserId}`);
        fetchUsers();
        setFeedback("Utilisateur supprimé avec succès !");
        resetForm();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        setFeedback("Erreur lors de la suppression de l'utilisateur.");
      }
    }
  };

  const handleAddUser = async () => {
    try {
      if (password.length < 6) {
        setFeedback("Le mot de passe doit comporter au moins 6 caractères.");
        return;
      }
      await axios.post("http://localhost:8000/api/manage-clients", {
        name,
        email,
        password,
        role,
      });
      fetchUsers();
      setFeedback("Utilisateur ajouté avec succès !");
      resetForm();
    } catch (error) {
      setFeedback(error.response.data.message);
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      setFeedback("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  const darkTheme = {
    control: (base) => ({
      ...base,
      backgroundColor: "dark",
      borderColor: "grey",
      color: "white",
    }),
    option: (base) => ({
      ...base,
      color: "black",
      backgroundColor: "white",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    clearIndicator: (base) => ({
      ...base,
      display: "none",
    }),
  };

  return (
    <Container className="manage-clients-container bg-dark text-white" style={{ minHeight: "100vh" }}>
      <h2 className="py-5">Gérer les clients</h2>

      {feedback && <Alert variant="info">{feedback}</Alert>}

      <h3>Liste des utilisateurs</h3>
      <Select styles={darkTheme} className="mb-5" options={users.map((user) => ({ label: `${user.name} - ${user.email} - ${user.role}`, value: user }))} onChange={handleUserSelect} placeholder="Sélectionnez un utilisateur..." isSearchable={true} isClearable={true} />

      {/* Modification de l'utilisateur */}
      <div className="user-details mt-5" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3>Ajouter ou modifier un utilisateur</h3>
        <Form className="col-12 col-md-6 col-lg-4">
          <Form.Group>
            <Form.Label>Nom :</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ textAlign: "center" }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ textAlign: "center" }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Mot de passe :</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: "center" }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Rôle :</Form.Label>
            <Form.Control style={{ textAlign: "center" }} as="select" value={role} onChange={(e) => setRole(e.target.value)}>
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
