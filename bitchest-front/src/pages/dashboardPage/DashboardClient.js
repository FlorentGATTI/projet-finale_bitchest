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

  // Cette fonction retourne le dernier prix d'une cryptomonnaie basé sur l'ID
  const getLastPrice = (cryptoId) => {
    // Filtrer les prix par ID de cryptomonnaie
    const pricesForCrypto = cryptosPrice.filter((price) => price.crypto_currency_id === cryptoId);

    // Trier les prix filtrés par timestamp en ordre décroissant et prendre le premier élément
    const latestPrice = pricesForCrypto.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    return latestPrice ? latestPrice.price : "N/A";
  };

  // Mapper à travers cryptos pour créer les options du composant Select
  const cryptoOptions = cryptos.map((crypto) => {
    const latestPrice = getLastPrice(crypto.id);
    return {
      value: crypto.id,
      label: `${crypto.name} - au cours de : ${latestPrice} €`,
    };
  });
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "dark",
      borderColor: "dark",
      color: "dark", 
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "dark", 
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
        <h3>Cryptomonnaies disponible</h3>
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
