import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container bg-dark">
      <h2 className="py-5">Dashboard BitChest</h2>

      {/* Statistiques générales */}
      <div className="statistics">
        <div className="stat-item bg-items">
          <h3>Total Investi</h3>
          <p>$10,000</p>
        </div>
        <div className="stat-item bg-items">
          <h3>Valeur actuelle</h3>
          <p>$12,500</p>
        </div>
        <div className="stat-item bg-items">
          <h3>Profit/Perte</h3>
          <p>+ $2,500</p>
        </div>
      </div>

      {/* Dernières transactions */}
      <div className="transactions bg-items">
        <h3>Dernières Transactions</h3>
        <ul className="transaction-list">
          <li>Achat: Bitcoin - $5000</li>
          <li>Vente: Ethereum - $2000</li>
          <li>Achat: Litecoin - $1500</li>
        </ul>
      </div>

      {/* Actualités */}
      <div className="news bg-items">
        <h3>Dernières Actualités</h3>
        <ul className="news-list">
          <li>Bitcoin atteint un nouveau sommet !</li>
          <li>Ethereum annonce des améliorations.</li>
          <li>Le marché des cryptos pourrait voir une correction.</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
