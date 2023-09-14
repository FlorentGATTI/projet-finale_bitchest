import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CryptoChart from "../CryptoChart/CryptoChart";
import Modal from "react-modal";
import "./CryptoConsultationComponent.css";

function CryptoConsultationComponent({ userRole, updateUserBalance }) {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [cryptoProgression, setCryptoProgression] = useState([]);
  const [purchaseQuantity, setPurchaseQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des données de ${url}:`, error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBuyClick = (cryptoId, cryptoName, latestCotation) => {
    const userCryptoOwnership = 20; // Placeholder
    if (userCryptoOwnership >= 30) {
      alert(`Vous possédez déjà 30% ou plus de ${cryptoName}. Vous ne pouvez pas acheter davantage.`);
      return;
    }

    setSelectedCrypto({ id: cryptoId, name: cryptoName, latestCotation });
    handleOpenModal();
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      console.log("Préparation à l'envoi de la requête avec : ", selectedCrypto.id, purchaseQuantity, selectedCrypto.latestCotation);

      const response = await axios.post(`http://localhost:8000/api/wallet/buy/${selectedCrypto.id}`, {
        quantity: purchaseQuantity,
        latestCotation: selectedCrypto.latestCotation,
      });
      console.log("API Response: ", response.data);

      if (response.data.success) {
        updateUserBalance();
        fetchAllData();
        setFeedbackMessage(`${selectedCrypto.name} achetée avec succès !`);
        setTimeout(() => setFeedbackMessage(null), 5000);
      }
    } catch (error) {
      console.error("Erreur lors de l'achat:", error);
    }
    handleCloseModal();
  };

  const fetchAllData = useCallback(async () => {
    const urls = ["http://localhost:8000/api/cryptocurrenciesprice", "http://localhost:8000/api/cryptocurrencies"];

    if (userRole === "client") {
      urls.push("http://localhost:8000/api/cryptocurrencies/progression");
    }

    try {
      const [cryptosData, currenciesData, progressionData] = await Promise.all(urls.map((url) => fetchData(url)));

      setCryptos(cryptosData);
      setCryptoCurrencies(currenciesData);
      if (userRole === "client") {
        setCryptoProgression(progressionData);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }, [userRole]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div className="container-fluid bg-dark text-light mobile-pt py-5">
      <h2 className="mb-4">Liste des crypto-monnaies disponibles</h2>
      <ul className="list-unstyled">
        {cryptoCurrencies.map((crypto) => {
          const cryptoNameForImage = crypto.name.toLowerCase().replace(/ /g, "-");

          // Récupération des prix pour cette crypto spécifique
          const cryptoPrices = cryptos.filter((item) => item.crypto_currency_id === crypto.id);

          // Tri des prix en fonction de la date pour obtenir le plus récent
          cryptoPrices.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Assurez-vous d'ajuster le champ 'date' si son nom diffère dans vos données

          const latestCryptoPrice = cryptoPrices[0];

          const chartData = cryptoProgression.find((item) => item.name.toLowerCase() === crypto.name.toLowerCase());

          return (
            <li key={crypto.id} className="mb-5">
                            {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}

              <img src={`/assets/images/${cryptoNameForImage}.png`} alt={crypto.name} className="pictocrypto" width="32" height="32" />
              <h3 className="font-weight-bold text-warning d-inline-block">
                {crypto.name} ({crypto.symbol}) - {latestCryptoPrice ? Number(latestCryptoPrice.price).toFixed(2) : "N/A"}€
              </h3>
              {userRole === "client" && chartData && (
                <div>
                  <CryptoChart data={chartData} />
                  <button className="btn btn-success mt-2" onClick={() => handleBuyClick(crypto.id, crypto.name, parseFloat(latestCryptoPrice.price).toFixed(2))}>
                    Acheter
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Acheter Crypto" ariaHideApp={false} className="custom-modal" overlayClassName="custom-modal-overlay">
        <h2>Acheter Crypto</h2>
        <form onSubmit={handlePurchase}>
          <label>
            Quantité :
            <input
              type="number"
              value={purchaseQuantity}
              onChange={(e) => {
                const val = e.target.value;
                setPurchaseQuantity(val === "" ? "" : parseInt(val, 10));
              }}
            />
          </label>
          <button type="submit" className="btn btn-success">
            Acheter
          </button>
          <button className="btn btn-danger" onClick={handleCloseModal}>
            Fermer
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default CryptoConsultationComponent;
