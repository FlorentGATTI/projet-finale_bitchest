import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Wallet.css";

function Wallet() {
  const [transactions, setTransactions] = useState([]);
  const [cryptoToSell, setCryptoToSell] = useState("");
  const [quantityToSell, setQuantityToSell] = useState(0);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const responseTransactions = await axios.get("http://localhost:8000/api/transactions");
        setTransactions(responseTransactions.data);

        const responseCryptocurrencies = await axios.get("http://localhost:8000/api/cryptocurrencies");
        setCryptocurrencies(responseCryptocurrencies.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSale = async () => {
    if (cryptoToSell && quantityToSell > 0) {
      try {
        // Appeler l'API pour enregistrer la vente (À faire)
        console.log(`Vendu ${quantityToSell} ${cryptoToSell}`);

        const response = await axios.get("http://localhost:8000/api/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Erreur lors de la vente:", error);
      }
    } else {
      console.log("Veuillez sélectionner une cryptomonnaie et une quantité valide.");
    }
  };

  const getProfitForCrypto = (cryptoId) => {
    const currentPrice = 0; // Faites un appel API pour obtenir le prix actuel
    const averageBoughtPrice = transactions.filter((t) => t.cryptocurrency_id === cryptoId).reduce((sum, t) => sum + t.price_at_purchase, 0);
    return currentPrice - averageBoughtPrice;
  };

  const getCryptoNameById = (cryptoId) => {
    const crypto = cryptocurrencies.find((c) => c.id === cryptoId);
    return crypto ? crypto.name : `ID: ${cryptoId}`;
  };

  return (
    <div className="wallet-container bg-dark">
      <h2 className="py-5">Gérer le Wallet</h2>

      <div className="wallet-content bg-items">
        <h3>Contenu du portefeuille :</h3>
        <ul className="crypto-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="crypto-item">
              {getCryptoNameById(transaction.cryptocurrency_id)}: {transaction.quantity}
              Profit: {getProfitForCrypto(transaction.cryptocurrency_id)}
            </li>
          ))}
        </ul>
      </div>

      <div className="sell-form bg-items">
        <h3>Vendre une cryptomonnaie</h3>

        <div className="form-group">
          <label>Choisissez une cryptomonnaie :</label>
          <select className="crypto-select" value={cryptoToSell} onChange={(e) => setCryptoToSell(e.target.value)}>
            {cryptocurrencies.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group bg-items">
          <label>Quantité à vendre :</label>
          <input type="number" className="crypto-input" value={quantityToSell} onChange={(e) => setQuantityToSell(Number(e.target.value))} />
        </div>

        <button className="sell-button" onClick={handleSale}>
          Vendre
        </button>
      </div>
    </div>
  );
}

export default Wallet;
