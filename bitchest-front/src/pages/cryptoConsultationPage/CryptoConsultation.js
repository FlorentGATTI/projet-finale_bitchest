import React from "react";
import CryptoConsultationComponents from "../../components/cryptoConsultation/CryptoConsultationComponent";
import './CryptoConsultation.css';

function CryptoConsultation({ userRole }) {

  return (
    <div className="main-content container">
      <CryptoConsultationComponents userRole={userRole} />
      {/* Ajoutez d'autres éléments ou routes ici si nécessaire */}
    </div>
  );
}

export default CryptoConsultation;
