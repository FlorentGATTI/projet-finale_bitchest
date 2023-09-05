import React, { useState } from "react";
import "./Wallet.css";

function Wallet() {
  const [cryptos, setCryptos] = useState([
    { name: "Bitcoin", amount: 2 },
    { name: "Ethereum", amount: 5 },
    { name: "Litecoin", amount: 10 },
  ]);

  // const [euroBalance, setEuroBalance] = useState(10000);
  const [cryptoToSell, setCryptoToSell] = useState("Bitcoin");
  const [quantityToSell, setQuantityToSell] = useState(0);

  const handleSale = () => {
    console.log(`Vendu ${quantityToSell} ${cryptoToSell}`);
  };

  return (
    <div className="wallet-container bg-dark">
      <h2 className="py-5">Gérer le Wallet</h2>

      {/* Solde en euro */}
      {/* <div className="balance-alert bg-items">Solde: {euroBalance}€</div> */}

      {/* Affichage du contenu du portefeuille */}
      <div className="wallet-content bg-items">
        <h3>Contenu du portefeuille :</h3>
        <ul className="crypto-list">
          {cryptos.map((crypto, index) => (
            <li key={index} className="crypto-item">
              {crypto.name}: {crypto.amount}
            </li>
          ))}
        </ul>
      </div>

      {/* Vente d'une cryptomonnaie */}
      <div className="sell-form bg-items">
        <h3>Vendre une cryptomonnaie</h3>

        <div className="form-group">
          <label>Choisissez une cryptomonnaie :</label>
          <select className="crypto-select" value={cryptoToSell} onChange={(e) => setCryptoToSell(e.target.value)}>
            {cryptos.map((crypto, index) => (
              <option key={index} value={crypto.name}>
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
