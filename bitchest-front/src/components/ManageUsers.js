import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";



function CryptoList() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    async function fetchCryptos() {
      try {
        const response = await axios.get("http://localhost:8000/api/cryptocurrencies");
        setCryptos(response.data);
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des cryptos", error);
      }
    }

    fetchCryptos();
  }, []);

  return (
    <div>
      <h2>Liste des Cryptos</h2>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} - Cours actuel: {crypto.cryptocurrencyprice ? crypto.cryptocurrencyprice.price : "N/A"} $
          </li>
        ))}
      </ul>
    </div>
  );
}

function CryptoGraph({ cryptoData }) {
  const chartData = {
    labels: cryptoData.map((crypto) => crypto.name),
    datasets: [
      {
        label: "Progression de Prix",
        data: cryptoData.map((crypto) => (crypto.cryptocurrency_price ? crypto.cryptocurrency_price.price : 0)),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        type: "linear", // Utilisez "linear" pour une échelle linéaire
        beginAtZero: true,
        // max: 500,
      },
    },
  };

  return (
    <div>
      <h2>Courbe de Progression</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

function CryptoBuy() {
  // ... Votre code pour l'achat de crypto
}

function ManageCryptos() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    async function fetchCryptos() {
      try {
        const response = await axios.get("http://localhost:8000/api/cryptocurrencies");
        setCryptoData(response.data);
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des cryptos", error);
      }
    }

    fetchCryptos();
  }, []);

  return (
    <div>
      <CryptoList />
      <CryptoGraph cryptoData={cryptoData} />
      <CryptoBuy />
    </div>
  );
}

export default ManageCryptos;
