import React from 'react';
import CryptoConsultationComponents from '../../components/cryptoConsultation/CryptoConsultationComponent';

function CryptoConsultation({ userRole }) { // Acceptez userRole ici

  return (
    <div>
      <h1>Affichage de la liste de Cryptomonnaie !</h1>
      <CryptoConsultationComponents userRole={userRole}/> {/* Transmettez-le ici */}
      {/* Ajoutez d'autres éléments ou routes ici si nécessaire */}
    </div>
  );
}

export default CryptoConsultation;
