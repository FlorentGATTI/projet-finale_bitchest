import React, { useState } from "react";
import "./Wallet.css";

function Wallet() {
  const [cryptos] = useState([
    { name: "Bitcoin", amount: 2 },
    { name: "Ethereum", amount: 5 },
    { name: "Litecoin", amount: 10 },
  ]);

  const [cryptoToSell, setCryptoToSell] = useState("Bitcoin");
  const [quantityToSell, setQuantityToSell] = useState(0);

  // Handles the sale of a cryptocurrency
  const handleSale = () => {
    // Implement logic to deduct sold amount from cryptos if necessary
    console.log(`Vendu ${quantityToSell} ${cryptoToSell}`);
  };

  return (
    <div className="wallet-container bg-dark">
      <h2 className="py-5">Gérer le Wallet</h2>

      {/* Displaying the wallet's content */}
      <div className="wallet-content bg-items">
        <h3>Contenu du portefeuille :</h3>
        <ul className="crypto-list">
          {cryptos.map((crypto) => (
            <li key={crypto.name} className="crypto-item">
              {crypto.name}: {crypto.amount}
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
              <option key={crypto.name} value={crypto.name}>
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
