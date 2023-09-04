import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoChart from "../CryptoChart/CryptoChart"; // Assurez-vous d'avoir le bon chemin d'accès

function CryptoConsultationComponent({ userRole }) {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptos, setCryptos] = useState([]); // Pour les prix
  const [cryptoProgression, setCryptoProgression] = useState([]); // Pour la progression

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cryptocurrencies")
      .then((response) => {
        setCryptocurrencies(response.data);
      })
      .catch(console.error);

    // Si l'utilisateur est un client, récupérez les prix des crypto-monnaies
    if (userRole === "client") {
      axios
        .get("http://localhost:8000/api/cryptocurrenciesprice")
        .then((response) => {
          setCryptos(response.data);
        })
        .catch(console.error);
    }

    // Si l'utilisateur est un admin, récupérez les données de progression des crypto-monnaies
    if (userRole === "admin") {
      axios
        .get("http://localhost:8000/api/cryptosprogression")
        .then((response) => {
          setCryptoProgression(response.data);
        })
        .catch(console.error);
    }
  }, [userRole]);

  return (
    <div>
      <h2>Cours des crypto-monnaies</h2>
      <ul>
        {cryptocurrencies.map((crypto) => {
          if (userRole === "client") {
            const cryptoPrice = cryptos.find((item) => item.cryptocurrency_id === crypto.id);
            return (
              <li key={crypto.id}>
                {crypto.name} ({crypto.symbol}) - {cryptoPrice ? cryptoPrice.price : "N/A"}€
              </li>
            );
          }
          const progression = cryptoProgression.find((item) => item.cryptocurrency_id === crypto.id);
          return (
            <li key={crypto.id}>
              {crypto.name} ({crypto.symbol}){progression && <CryptoChart data={progression} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CryptoConsultationComponent;
