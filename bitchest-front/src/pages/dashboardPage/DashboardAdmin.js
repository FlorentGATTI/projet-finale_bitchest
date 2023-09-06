import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardAdmin() {
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/manage-clients')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching client data:', error);
      });
  }, []);

  return (
    <div className="dashboard-container bg-dark">
      <h2 className="py-5">Dashboard Administrateur</h2>

      {/* Statistiques générales */}
      <div className="statistics">
        <div className="stat-item bg-items">
          <h3>Nombre total de clients</h3>
          <p>{clients.length}</p>
        </div>
        {/* Les autres statistiques nécessiteraient des appels supplémentaires pour obtenir des données */}
        {/* ... */}
      </div>

      {/* Gestion des utilisateurs */}
      <div className="user-management bg-items">
        <h3>Gestion des utilisateurs</h3>
        <ul className="user-list">
          {clients.map(client => (
            <li key={client.id}>{client.name} - {client.role}</li>
          ))}
        </ul>
      </div>

      {/* Consultation des cours des crypto monnaies */}
      {/* Ce sera similaire à ce que nous avons fait pour DashboardClient, 
           mais avec la capacité pour l'admin de voir toutes les cryptos */}
      {/* ... */}
    </div>
  );
}

export default DashboardAdmin;
