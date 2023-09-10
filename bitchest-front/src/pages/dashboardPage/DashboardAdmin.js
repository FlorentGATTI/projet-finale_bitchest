import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function DashboardAdmin() {
  const [clients, setClients] = useState([]);
  const [userConnected, setUserConnected] = useState("");  // État pour l'utilisateur connecté

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/manage-clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });

    // Supposons que vous récupérez l'utilisateur connecté de cette manière (à ajuster selon votre logique)
    axios
      .get("http://localhost:8000/api/current-user")
      .then((response) => {
        setUserConnected(response.data.name);  // Mettre à jour avec le nom de l'utilisateur connecté
      })
      .catch((error) => {
        console.error("Error fetching connected user:", error);
      });
  }, []);

  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: `${client.name} - ${client.role}`,
  }));

  // Styles pour le composant Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "dark",
      borderColor: "grey",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <div className="dashboard-container bg-dark">
      <h2 className="py-5">Dashboard Administrateur</h2>
      <h2 className="py-5">Bienvenue sur le dashboard {userConnected}</h2>

      <h3>Nombre total d'utilisateurs : {clients.length}</h3>

      {/* Gestion des utilisateurs */}
      <div className="user-management bg-items">
        <h3>Liste des utilisateurs</h3>
        <Select
          options={clientOptions}
          onChange={(selectedOption) => {
            console.log("Client sélectionné:", selectedOption);
          }}
          className="dropdown"
          styles={customStyles}
          isClearable={false} // Désactiver le bouton de suppression
          isSearchable={false} // Empêche la recherche
          isOptionDisabled={(option) => true} // Rend toutes les options non-cliquables
          placeholder="Afficher les utilisateurs..."
        />
      </div>
    </div>
  );
}

export default DashboardAdmin;
