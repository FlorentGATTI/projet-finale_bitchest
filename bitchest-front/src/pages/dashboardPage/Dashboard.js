import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardAdmin from './DashboardAdmin';
import DashboardClient from './DashboardClient';
import './Dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/current-user-data')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container bg-dark">
      {userData.role === "admin" ? <DashboardAdmin /> : <DashboardClient />}
    </div>
  );
}

export default Dashboard;
