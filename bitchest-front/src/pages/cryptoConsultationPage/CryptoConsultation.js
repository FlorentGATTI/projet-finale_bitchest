// CryptoConsultation.js
import React from "react";
import CryptoConsultationComponent from "../../components/cryptoConsultation/CryptoConsultationComponent";
import "./CryptoConsultation.css";

function CryptoConsultation({ userRole, updateUserBalance }) {
  return (
    <div className="main-content container">
      <CryptoConsultationComponent userRole={userRole} updateUserBalance={updateUserBalance} />
    </div>
  );
}

export default CryptoConsultation;
