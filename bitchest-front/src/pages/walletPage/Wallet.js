import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Wallet.css";

function Wallet() {
  const [transactions, setTransactions] = useState([]);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/current-user");
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (userData && userData.id) {
        try {
          const transactionsResp = await axios.get(`http://localhost:8000/api/wallet/transactions/${userData.id}`);
          setTransactions(transactionsResp.data);
          console.log("setTransactions", transactionsResp.data);

          const cryptoResp = await axios.get("http://localhost:8000/api/cryptocurrencies");
          setCryptocurrencies(cryptoResp.data);
          console.log("setCryptocurrencies", cryptoResp.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
        }
      }
    };

    fetchAllData();
  }, [userData]);

  const handleSale = async (transactionId) => {
    try {
      await axios.post(`http://localhost:8000/api/wallet/sell/${transactionId}`);
      const transactionsResp = await axios.get(`http://localhost:8000/api/wallet/transactions/${userData?.id}`);
      setTransactions(transactionsResp.data);
      console.log("setTransactions2", transactionsResp.data);
    } catch (error) {
      console.error("Erreur lors de la vente:", error);
    }
  };

  const getCryptoNameById = (id) => {
    const crypto = cryptocurrencies.find((c) => c.id === id);
    return crypto ? crypto.name : "N/A";
  };

  const profitForCrypto = (initialPrice, currentPrice, quantity) => (currentPrice - initialPrice) * quantity;

  const getProfitForCrypto = (cryptoId, initialPrice, quantity) => {
    const crypto = cryptocurrencies.find((c) => c.id === cryptoId);
    return crypto ? profitForCrypto(initialPrice, crypto.currentPrice, quantity) : 0;
  };

  return (
    <div className="wallet-container bg-dark">
      <h2 className="py-5">Gérer le Wallet</h2>
      <div className="wallet-content bg-items">
        <h3>Contenu du portefeuille :</h3>
        <ul className="crypto-list">
          {Array.isArray(transactions) &&
            transactions.map((transaction) => (
              <li key={transaction.id} className="crypto-item">
                {getCryptoNameById(transaction.cryptocurrency_id)}: {transaction.quantity}
                <br />
                Date d'achat: {transaction.date}
                <br />
                Cours lors de l'achat: {transaction.initialPrice}€
                <br />
                Plus-value: {getProfitForCrypto(transaction.cryptocurrency_id, transaction.initialPrice, transaction.quantity)}€
                <br />
                <button onClick={() => handleSale(transaction.id)}>Vendre tout</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Wallet;
