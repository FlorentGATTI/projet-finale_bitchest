import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataClient.css';

function DataClient() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Fonction pour obtenir les données de l'utilisateur actuellement connecté
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/manage-clients');

                // Utilisez des valeurs par défaut pour éviter 'undefined'
                setName(response.data.name || ''); 
                setEmail(response.data.email || '');

            } catch (error) {
                console.error("Il y a eu une erreur lors de l'appel API:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <div className="data-personel-container bg-dark">
            <h2 className="py-5">Gérer leurs données personnelles</h2>

            <div className="user-details bg-items">
                <h3>Modifier les données</h3>

                <div className="form-group bg-items">
                    <label>Nom :</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="form-group bg-items">
                    <label>Email :</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <button className="btn btn-primary">Mettre à jour</button>
            </div>
        </div>
    );
}

export default DataClient;
