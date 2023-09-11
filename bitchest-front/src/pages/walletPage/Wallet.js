import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Wallet.css";

function Wallet() {
  const [transactions, setTransactions] = useState([]);
  const [cryptos, setCryptos] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState("");

  const fetchUserTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions:", error);
    }
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cryptocurrencies");
        const cryptosObj = response.data.reduce((obj, crypto) => {
          obj[crypto.id] = crypto.name;
          return obj;
        }, {});
        setCryptos(cryptosObj);
      } catch (error) {
        console.error("Erreur lors de la récupération des cryptos:", error);
      }
    };

    fetchCryptos();
    fetchUserTransactions();
  }, []);

  const handleSale = async (cryptoId) => {
    try {
      await axios.post(`http://localhost:8000/api/wallet/sell/${cryptoId}`);
      fetchUserTransactions();
    } catch (error) {
      console.error("Erreur lors de la vente:", error);
    }
  };

  return (
    <div className="wallet-container bg-dark">
      <h2 className="py-5">Gérer le Wallet</h2>
      <div className="wallet-content bg-items">
        <h3>Transactions :</h3>
        <ul className="crypto-list">
          {Array.isArray(transactions) &&
            transactions.map((transaction) => (
              <li key={transaction.id} className="crypto-item">
                {cryptos[transaction.cryptocurrency_id] || "N/A"}: {transaction.quantity}
              </li>
            ))}
        </ul>

        <select 
          value={selectedCrypto} 
          onChange={(e) => setSelectedCrypto(e.target.value)}
          className="bg-white"
        >
          <option value="" disabled>
            Choisir une crypto à vendre
          </option>
          {transactions.map((transaction) => (
            <option key={transaction.id} value={transaction.cryptocurrency_id}>
              {cryptos[transaction.cryptocurrency_id] || "N/A"}
            </option>
          ))}
        </select>

        {selectedCrypto && <button onClick={() => handleSale(selectedCrypto)}>Vendre tout</button>}
      </div>
    </div>
  );
}

export default Wallet;
