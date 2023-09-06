import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Wallet.css";

function Wallet() {
  const [cryptos, setCryptos] = useState([]);
  const [cryptoToSell, setCryptoToSell] = useState("");
  const [quantityToSell, setQuantityToSell] = useState(0);

  useEffect(() => {
    // Charger les transactions de l'utilisateur dès le chargement du composant
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/transactions");
        console.log("response transactions", response.data);
        setCryptos(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSale = async () => {
    if (cryptoToSell && quantityToSell > 0) {
      try {
        // Ici, vous pouvez appeler votre API pour enregistrer la vente
        // Pour l'instant, nous allons simplement afficher un message
        console.log(`Vendu ${quantityToSell} ${cryptoToSell}`);
        // Après la vente, recharger les transactions
        const response = await axios.get("http://localhost:8000/api/transactions");
        setCryptos(response.data);
      } catch (error) {
        console.error("Erreur lors de la vente:", error);
      }
    } else {
      console.log("Veuillez sélectionner une cryptomonnaie et une quantité valide.");
    }
  };

  return (
    <div className="wallet-container bg-dark">
      <h2 className="py-5">Gérer le Wallet</h2>

      {/* Displaying the wallet's content */}
      <div className="wallet-content bg-items">
        <h3>Contenu du portefeuille :</h3>
        <ul className="crypto-list">
          {cryptos.map((crypto) => (
            <li key={crypto.id} className="crypto-item">
              Crypto ID {crypto.cryptocurrency_id}: {crypto.quantity}
            </li>
          ))}
        </ul>
      </div>

      {/* Cryptocurrency selling form */}
      <div className="sell-form bg-items">
        <h3>Vendre une cryptomonnaie</h3>

        <div className="form-group">
          <label>Choisissez une cryptomonnaie :</label>
          <select className="crypto-select" value={cryptoToSell} onChange={(e) => setCryptoToSell(e.target.value)}>
            {cryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.cryptocurrency_id}>
                Crypto ID {crypto.cryptocurrency_id}
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
