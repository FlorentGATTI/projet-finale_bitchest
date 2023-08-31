import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CryptoConsultation() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    // Récupère les noms, symboles, etc.
    axios
      .get('http://localhost:8000/api/cryptocurrencies')
      .then(response => {
        console.log("cryptocurrencies", response);
        setCryptocurrencies(response.data);
      })
      .catch(error => {
        console.error(error);  
      });

    // Récupère juste les prix
    axios.get('http://localhost:8000/api/cryptocurrenciesprice')
      .then(response => {
        console.log("cryptos", response);
        setCryptos(response.data);
      });

  }, []);

  return (
    <div>
      <h2>Cours des crypto monnaies</h2>

      <ul>
        {cryptocurrencies.map(crypto => {
          const cryptoPrice = cryptos.find(item => item.cryptocurrency_id === crypto.id);
          return (
            <li key={crypto.id}>
              {crypto.name} ({crypto.symbol}) - {cryptoPrice ? cryptoPrice.price : 'N/A'}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CryptoConsultation;
