import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function DashboardClient() {
  const [cryptos, setCryptos] = useState([]);
  const [userData, setUserData] = useState("null");
  const [userConnected, setUserConnected] = useState("");
  const [balance, setBalance] = useState("");
  const [cryptosPrice, setCryptosPrice] = useState([]);

  useEffect(() => {
    // Chargement des crypto monnaies
    axios
      .get("http://localhost:8000/api/cryptocurrencies")
      .then((response) => {
        setCryptos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cryptocurrencies:", error);
      });

    // Pour les prix des cryptos
    axios
      .get("http://localhost:8000/api/cryptocurrenciesprice")
      .then((response) => {
        setCryptosPrice(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cryptocurrencies prices:", error);
      });

    // Pour le portefeuille du user
    axios
      .get("http://localhost:8000/api/wallet/balance")
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error("Error fetching user balance:", error);
      });

    // Chargement des données utilisateur
    axios
      .get("http://localhost:8000/api/current-user")
      .then((response) => {
        setUserConnected(response.data.name);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const cryptoOptions = cryptos.map((crypto) => {
    const latestPrice = cryptosPrice.find((priceData) => priceData.crypto_currency_id === crypto.id);
    return {
      value: crypto.id,
      label: `${crypto.name} - au cours de : ${latestPrice ? latestPrice.price : "N/A"} €`,
    };
  });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "dark",
      borderColor: "dark",
      color: "dark", // Modification de la couleur en noir
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "dark", // Modification de la couleur en noir
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "dark",
    }),
    option: (provided) => ({
      ...provided,
      color: "dark",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };
  
  return (
    <div className="dashboard-container bg-dark">
      <h2 className="py-5">Dashboard Client</h2>
      <h2 className="py-5">Bienvenue sur le dashboard {userConnected}</h2>

      {/* Statistiques personnelles */}
      <div className="personal-stats bg-items">
        {userData && (
          <>
            <div>
              <h3>Solde en euros</h3>
              <p>{balance} €</p>
            </div>
          </>
        )}
      </div>

      {/* Portefeuille */}
      <div className="wallet bg-items">
        <h3>Portefeuille</h3>
        <Select
          options={cryptoOptions}
          onChange={(selectedOption) => {
            console.log("Crypto sélectionnée:", selectedOption);
          }}
          className="dropdown"
          styles={customStyles}
          isClearable={false} // Désactiver le bouton de suppression
          isSearchable={false} // Empêche la recherche
          placeholder="Afficher les cryptomonnaies ..."
        />
      </div>
    </div>
  );
}

export default DashboardClient;
