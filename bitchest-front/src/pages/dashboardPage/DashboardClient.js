import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardClient() {
  const [cryptos, setCryptos] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Chargement des crypto monnaies
    axios.get('http://localhost:8000/api/cryptocurrencies')
      .then(response => {
        setCryptos(response.data);
      })
      .catch(error => {
        console.error('Error fetching cryptocurrencies:', error);
      });

    // Chargement des données utilisateur
    axios.get('http://localhost:8000/api/current-user-data')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

  }, []);

  return (
    <div className="dashboard-container bg-dark">
      <h2 className="py-5">Dashboard Client</h2>

      {/* Statistiques personnelles */}
      <div className="personal-stats bg-items">
        {/* Supposons que userData contient un solde, une valeur de portefeuille, etc. */}
        {userData && (
          <>
            <div>
              <h3>Solde en euros</h3>
              <p>{userData.balance} €</p>
            </div>
            <div>
              <h3>Valeur totale du portefeuille</h3>
              <p>{userData.walletValue} €</p>
            </div>
            {/* ... */}
          </>
        )}
      </div>

      {/* Portefeuille */}
      <div className="wallet bg-items">
        <h3>Portefeuille</h3>
        <ul className="crypto-list">
          {cryptos.map(crypto => (
            <li key={crypto.id}>
              {crypto.name} - Acheté à: {crypto.purchaseValue} € 
              (Plus-value: {crypto.currentValue - crypto.purchaseValue} €)
            </li>
          ))}
        </ul>
      </div>

      {/* Consultation des cours des crypto monnaies */}
      {/* ... */}
      
      {/* Historique des transactions */}
      {/* ... */}
      
      {/* Actualités */}
      <div className="news bg-items">
        <h3>Dernières Actualités</h3>
        <ul className="news-list">
          {/* Ces données devraient être chargées depuis une API */}
          {/* ... */}
        </ul>
      </div>
    </div>
  );
}

export default DashboardClient;
