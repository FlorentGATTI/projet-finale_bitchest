import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function CryptoChart({ data = {} }) {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data?.progression) {
      const mappedValues = data.progression.map((dataPoint) => parseFloat(dataPoint.value));
      const mappedDates = data.progression.map((dataPoint) => dataPoint.date);

      setSeries(mappedValues);
      setCategories(mappedDates);
    }
  }, [data]);

  if (!data?.progression?.length) {
    return <p>Données non disponibles</p>;
  }

  const options = {
    chart: {
      type: "line",
      foreColor: "#fff",
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#fff",
        },
      },
      axisBorder: {
        color: "#fff",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        colors: ["#000"],
      },
    },
  };

  return (
    <div
      className="chart-container mb-4"
      style={{
        maxWidth: "90%",
        background: "rgb(51, 51, 51)",
        borderRadius: "10px",
        padding: "20px",
        margin: "0 auto", // Cette propriété centre le conteneur horizontalement.
      }}
    >
      <h2 style={{ color: "#fff" }}>Courbe de progression de la crypto-monnaie</h2>
      <ReactApexChart options={{ ...options, colors: ["#f8c545"] }} series={[{ name: "Prix en €", data: series }]} type="line" />
    </div>
  );
}

export default CryptoChart;
