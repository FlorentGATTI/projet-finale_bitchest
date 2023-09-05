import React, { useState, useEffect } from "react";
import axios from "axios"; // Assurez-vous d'avoir importé axios car nous l'utilisons pour effectuer la requête API
import "./ManageClients.css";

function ManageClients() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");

  useEffect(() => {
    // Appel de la fonction pour récupérer l'utilisateur actuel
    fetchCurrentUser();

    // Simulez l'appel API pour obtenir la liste des utilisateurs (vous pouvez éventuellement supprimer cette partie si elle n'est pas nécessaire)
    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", role: "client" },
      { id: 2, name: "Admin", email: "admin@example.com", role: "admin" },
    ]);
  }, []);

  const fetchCurrentUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/manage-clients');

        // Vérification des données de réponse avant de mettre à jour l'état
        const newName = response.data.name || name;
        const newEmail = response.data.email || email;

        setName(newName);
        setEmail(newEmail);
    } catch (error) {
        console.error("Il y a eu une erreur lors de l'appel API:", error);
    }
  };

  const handleUserSelect = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  return (
    <div className="manage-clients-container bg-dark">
      <h2 className="py-5">Gérer les clients</h2>

      {/* Liste des utilisateurs */}
      <div className="user-list">
        <h3>Liste des utilisateurs</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)}>
              {user.name} - {user.email} - {user.role}
            </li>
          ))}
        </ul>
      </div>

      {/* Modification de l'utilisateur */}
      <div className="user-details">
        <h3>Modifier un utilisateur</h3>

        <div className="form-group">
          <label>Nom :</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Rôle :</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn btn-primary">Mettre à jour</button>
        <button className="btn btn-danger">Supprimer</button>
      </div>
    </div>
  );
}

export default ManageClients;
