import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import axios from "axios";
import "./Wallet.css";

const API_URL = "http://localhost:8000/api";

const fetchTransactionsAndCryptos = async () => {
  const transactionsResponse = axios.get(`${API_URL}/transactions`);
  const cryptosResponse = axios.get(`${API_URL}/cryptocurrencies`);

  return await Promise.all([transactionsResponse, cryptosResponse]);
};

const darkTheme = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1C2331",
    color: "#FFF",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2E344E" : "#1C2331",
    color: "#FFF",
    padding: 10,
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#1C2331",
    borderColor: "#2E344E",
    color: "#FFF",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  input: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
};

function Wallet({ updateUserBalance }) {
  const [transactions, setTransactions] = useState([]);
  const [cryptos, setCryptos] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [transactionsData, cryptosData] = await fetchTransactionsAndCryptos();
        const buyTransactions = transactionsData.data.filter((t) => t.transaction_type === "buy"); // Filter buy transactions

        setTransactions(buyTransactions);

        const cryptosObj = cryptosData.data.reduce((obj, { id, name }) => {
          obj[id] = name;
          return obj;
        }, {});
        setCryptos(cryptosObj);
      } catch (error) {
        setError("Une erreur s'est produite lors de la récupération des données.");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleSale = async (cryptoId) => {
    const transaction = transactions.find((t) => t.crypto_currency_id === cryptoId);
  
    if (!transaction || transaction.quantity <= 0) {
      setError("Vous ne pouvez pas vendre de crypto avec une quantité de 0.");
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/wallet/sell/${cryptoId}`);
  
      // Check for errors in the response data
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
  
      const [transactionsData] = await fetchTransactionsAndCryptos();
      setTransactions(transactionsData.data);
      setFeedback(`${cryptos[cryptoId]} vendue avec succès !`);
      setTimeout(() => setFeedback(null), 5000);
  
      // Ajout de cette ligne pour mettre à jour le solde de l'utilisateur
      updateUserBalance();
    } catch (error) {
      setError("Une erreur s'est produite lors de la vente.");
      console.error(error);
    }
  };
  

  const isZeroQuantity = useMemo(() => {
    if (selectedCrypto) {
      const transaction = transactions.find((t) => t.crypto_currency_id === selectedCrypto.value);
      return transaction && transaction.quantity <= 0;
    }
    return false;
  }, [selectedCrypto, transactions]);

  const cryptoOptions = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.quantity > 0)
        .map((transaction) => ({
          value: transaction.crypto_currency_id,
          label: `${cryptos[transaction.crypto_currency_id] || "N/A"} - ${transaction.quantity}`,
        })),
    [transactions, cryptos]
  );

  const handleSelectChange = (option) => {
    setSelectedCrypto(option);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="wallet-container bg-dark">
      <h2 className="py-5">Gérer le Wallet</h2>
      {feedback && <div className="feedback-message">{feedback}</div>}
      <div className="wallet-content bg-items">
        <h3>Transactions :</h3>
        <ul className="crypto-list">
          {transactions
            .filter((transaction) => transaction.quantity > 0)
            .map((transaction) => (
              <li key={transaction.id} className="crypto-item">
                {cryptos[transaction.crypto_currency_id] || "N/A"}: {transaction.quantity}
              </li>
            ))}
        </ul>

        <Select value={selectedCrypto} options={cryptoOptions} isClearable placeholder="Choisir une crypto à vendre..." className="crypto-dropdown" styles={darkTheme} onChange={handleSelectChange} />

        {selectedCrypto && (
          <button disabled={isZeroQuantity} onClick={() => handleSale(selectedCrypto.value)}>
            Vendre tout
          </button>
        )}
      </div>
    </div>
  );
}

export default Wallet;
