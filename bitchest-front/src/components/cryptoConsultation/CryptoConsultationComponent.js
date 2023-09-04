import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoChart from "../CryptoChart/CryptoChart";
import './CryptoConsultationComponent.css';

function CryptoConsultationComponent({ userRole }) {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [cryptoProgression, setCryptoProgression] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cryptocurrencies")
      .then((response) => {
        setCryptocurrencies(response.data);
      })
      .catch(console.error);

    axios
      .get("http://localhost:8000/api/cryptocurrenciesprice")
      .then((response) => {
        setCryptos(response.data);
      })
      .catch(console.error);

    if (userRole === "client") {
      axios
        .get("http://localhost:8000/api/cryptocurrencies/progression")
        .then((response) => {
          console.log("setCryptoProgression", response.data);
          setCryptoProgression(response.data);
        })
        .catch(console.error);
    }
  }, [userRole]);

  const handleBuyClick = (cryptoId, cryptoName) => {
    const userCryptoOwnership = 20; // Ceci est un exemple. Vous devriez récupérer cette valeur depuis votre base de données ou API.

    if (userCryptoOwnership >= 30) {
      alert(`Vous possédez déjà 30% ou plus de ${cryptoName}. Vous ne pouvez pas acheter davantage.`);
      return;
    }

    const cryptoPrice = cryptos.find((item) => item.cryptocurrency_id === cryptoId).price;
    const maxPurchaseAmount = 5000;

    const maxQuantity = Math.floor(maxPurchaseAmount / cryptoPrice);

    const quantity = window.prompt(`Combien de ${cryptoName} souhaitez-vous acheter ? Vous pouvez acheter jusqu'à ${maxQuantity} en fonction du prix actuel.`);

    if (quantity && quantity * cryptoPrice <= maxPurchaseAmount) {
      alert(`Vous avez choisi d'acheter ${quantity} de ${cryptoName}.`);
      // Appeler l'API pour traiter l'achat, stocker la transaction, etc.
    } else {
      alert(`Vous ne pouvez pas dépenser plus de ${maxPurchaseAmount}€ en un seul achat.`);
    }
  };

  return (
    <div className="container-fluid bg-dark text-light mobile-pt py-5">
      <h2 className="mb-4">Cours des crypto-monnaies</h2>
      <ul className="list-unstyled">
        {cryptocurrencies.map((crypto) => {
          const cryptoPrice = cryptos.find((item) => item.cryptocurrency_id === crypto.id);
          const chartData = cryptoProgression.find((item) => item.name === crypto.name);

          return (
            <li key={crypto.id} className="mb-5">
              <h3 className="font-weight-bold text-warning">{crypto.name} ({crypto.symbol}) - {cryptoPrice ? cryptoPrice.price : "N/A"}€</h3>
              {userRole === "client" && chartData && (
                <div>
                  <CryptoChart data={chartData} />
                  <button className="btn btn-warning mt-2" onClick={() => handleBuyClick(crypto.id, crypto.name)}>Acheter</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CryptoConsultationComponent;
