import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function CryptoChart({ cryptocurrencyId }) {
  const [cryptoData, setCryptoData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Récupérez les données de la courbe de progression de la crypto-monnaie spécifiée
    axios
      .get(`http://localhost:8000/api/cryptochart/${cryptocurrencyId}`)
      .then(response => {
        setCryptoData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [cryptocurrencyId]);

  useEffect(() => {
    // Transformez les données de la crypto-monnaie en format adapté au graphique
    const chartData = {
      labels: cryptoData.map(dataPoint => dataPoint.timestamp),
      datasets: [
        {
          label: 'Prix en €',
          data: cryptoData.map(dataPoint => dataPoint.price),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
    setChartData(chartData);
  }, [cryptoData]);

  return (
    <div>
      <h2>Courbe de progression de la crypto-monnaie</h2>
      <Line data={chartData} />
    </div>
  );
}

export default CryptoChart;
