import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CryptoConsultationComponents() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/cryptocurrencies')
      .then(response => {
        setCryptocurrencies(response.data);
      })
    
      .catch(error => {
        console.error('Error fetching cryptocurrencies:', error);
      });
  }, []);

  return (
    <div>
      <h2>Cours des crypto monnaies</h2>
      <ul>
        {cryptocurrencies.map(crypto => (
          <li key={crypto.id}>
            {crypto.name} ({crypto.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoConsultationComponents;
