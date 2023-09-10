import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoChart from "../CryptoChart/CryptoChart";
import Modal from "react-modal";
import "./CryptoConsultationComponent.css";

function CryptoConsultationComponent({ userRole, setTransactions }) {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [cryptoProgression, setCryptoProgression] = useState([]);
  const [purchaseQuantity, setPurchaseQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);

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

  const handleBuyClick = (cryptoId, cryptoName) => {
    const userCryptoOwnership = 20;
    if (userCryptoOwnership >= 30) {
      alert(`Vous possédez déjà 30% ou plus de ${cryptoName}. Vous ne pouvez pas acheter davantage.`);
      return;
    }
    handleOpenModal();
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/wallet/buy/${purchaseQuantity}`);
      const updatedCryptos = await fetchData("http://localhost:8000/api/cryptocurrenciesprice");
      setCryptos(updatedCryptos);
      const transactionsResp = await axios.get(`http://localhost:8000/api/wallet/transactions/${userData?.id}`);
      setTransactions(transactionsResp.data);
    } catch (error) {
      console.error("Erreur lors de l'achat:", error);
    }
    handleCloseModal();
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [cryptosData, currenciesData, progressionData] = await Promise.all([fetchData("http://localhost:8000/api/cryptocurrenciesprice"), fetchData("http://localhost:8000/api/cryptocurrencies"), userRole === "client" ? fetchData("http://localhost:8000/api/cryptocurrencies/progression") : Promise.resolve([])]);
        setCryptos(cryptosData);
        setCryptocurrencies(currenciesData);
        console.log('setCryptocurrencies',currenciesData);
        if (userRole === "client") {
          setCryptoProgression(progressionData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchAllData();
  }, [userRole]);

  return (
    <div className="container-fluid bg-dark text-light mobile-pt py-5">
      <h2 className="mb-4">Liste des crypto-monnaies disponibles</h2>
      <ul className="list-unstyled">
        {cryptocurrencies.map((crypto) => {
          const cryptoNameForImage = crypto.name.toLowerCase().replace(/ /g, "-");

          // Récupération des prix pour cette crypto spécifique
          const cryptoPrices = cryptos.filter((item) => item.cryptocurrency_id === crypto.id);

          // Tri des prix en fonction de la date pour obtenir le plus récent
          cryptoPrices.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Assurez-vous d'ajuster le champ 'date' si son nom diffère dans vos données

          const latestCryptoPrice = cryptoPrices[0];

          const chartData = cryptoProgression.find((item) => item.name.toLowerCase() === crypto.name.toLowerCase());

          console.log(typeof latestCryptoPrice.price);

          return (
            <li key={crypto.id} className="mb-5">
              <img src={`/assets/images/${cryptoNameForImage}.png`} alt={crypto.name} className="pictocrypto" width="32" height="32" />
              <h3 className="font-weight-bold text-warning d-inline-block">
                {crypto.name} ({crypto.symbol}) - {latestCryptoPrice ? Number(latestCryptoPrice.price).toFixed(2) : "N/A"}€
              </h3>
              {userRole === "client" && chartData && (
                <div>
                  <CryptoChart data={chartData} />
                  <button className="btn btn-warning mt-2" onClick={() => handleBuyClick(crypto.id, crypto.name)}>
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
            <input type="number" value={purchaseQuantity} onChange={(e) => setPurchaseQuantity(parseInt(e.target.value))} />
          </label>
          <button type="submit" className="btn btn-primary">
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
