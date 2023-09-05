import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoChart from "../CryptoChart/CryptoChart";
import "./CryptoConsultationComponent.css";

function CryptoConsultationComponent({ userRole }) {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [cryptoProgression, setCryptoProgression] = useState([]);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("http://localhost:8000/api/cryptocurrencies").then(setCryptocurrencies);
    fetchData("http://localhost:8000/api/cryptocurrenciesprice").then(setCryptos);

    if (userRole === "client") {
      fetchData("http://localhost:8000/api/cryptocurrencies/progression").then(setCryptoProgression);
    }
  }, [userRole]);

  const handleBuyClick = (cryptoId, cryptoName) => {
    const userCryptoOwnership = 20;

    if (userCryptoOwnership >= 30) {
      alert(`Vous possédez déjà 30% ou plus de ${cryptoName}. Vous ne pouvez pas acheter davantage.`);
      return;
    }

    const cryptoPriceObj = cryptos.find((item) => item.cryptocurrency_id === cryptoId);
    const cryptoPrice = cryptoPriceObj ? cryptoPriceObj.price : null;
    const maxPurchaseAmount = 5000;

    const maxQuantity = cryptoPrice ? Math.floor(maxPurchaseAmount / cryptoPrice) : 0;

    const quantity = window.prompt(`Combien de ${cryptoName} souhaitez-vous acheter ? Vous pouvez acheter jusqu'à ${maxQuantity} en fonction du prix actuel.`);

    if (quantity && cryptoPrice && quantity * cryptoPrice <= maxPurchaseAmount) {
      alert(`Vous avez choisi d'acheter ${quantity} de ${cryptoName}.`);
      // Ici, ajoutez le traitement pour l'achat
    } else {
      alert(`Vous ne pouvez pas dépenser plus de ${maxPurchaseAmount}€ en un seul achat.`);
    }
  };

  return (
    <div className="container-fluid bg-dark text-light mobile-pt py-5">
      <h2 className="mb-4">Cours des crypto-monnaies</h2>
      <ul className="list-unstyled">
        {cryptocurrencies.map((crypto) => {
          const cryptoNameForImage = crypto.name.toLowerCase().replace(/ /g, "-"); // For accessing image
          const cryptoPriceObj = cryptos.find((item) => item.cryptocurrency_id === crypto.id);
          const chartData = cryptoProgression.find((item) => item.name.toLowerCase() === crypto.name.toLowerCase()); // No replacement here

          return (
            <li key={crypto.id} className="mb-5">
              <img src={`/assets/images/${cryptoNameForImage}.png`} alt={crypto.name} className="pictocrypto" width="32" height="32" />
              <h3 className="font-weight-bold text-warning d-inline-block">
                {crypto.name} ({crypto.symbol}) - {cryptoPriceObj ? cryptoPriceObj.price : "N/A"}€
              </h3>
              {userRole === "client" && chartData && (
                <div>
                  <CryptoChart data={chartData} />
                  <button className="btn btn-warning mt-2" onClick={() => handleBuyClick(crypto.id, crypto.name)}>
                    Acheter
                  </button>
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
