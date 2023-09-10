// CryptoConsultation.js
import React from "react";
import CryptoConsultationComponent from "../../components/cryptoConsultation/CryptoConsultationComponent";
import "./CryptoConsultation.css";

function CryptoConsultation({ userRole }) {

  return (
    <div className="main-content container">
      {/* Passer setTransactions en tant que prop */}
      <CryptoConsultationComponent userRole={userRole} />
      {/* Ajoutez d'autres éléments ou routes ici si nécessaire */}
    </div>
  );
}

export default CryptoConsultation;
