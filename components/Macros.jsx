"use client";
import MacroChart from "./MacroChart";

import { useState, useEffect } from "react";

export default function Macros() {
  const [dataGlucides, setDataGlucides] = useState([]);
  const [dataProteines, setDataProteines] = useState([]);
  const [dataLipides, setDataLipides] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/eat");
    const data = await response.json();

    // Grouper les données par date
    const dailyTotals = data.eats.reduce((acc, item) => {
      const date = new Date(item.dateEaten).toISOString().split("T")[0];

      if (!acc[date]) {
        acc[date] = {
          glucides: 0,
          proteines: 0,
          lipides: 0,
        };
      }

      // Calculer les macros en fonction des grammes ou de la quantité
      let multiplier;
      if (item.grams > 0) {
        // Si on a des grammes et que c'est pour 100g
        multiplier = item.food.is100g ? item.grams / 100 : item.grams;
      } else {
        // Si on a une quantité
        multiplier = item.quantity;
      }

      acc[date].glucides += item.food.glucides * multiplier;
      acc[date].proteines += item.food.proteines * multiplier;
      acc[date].lipides += item.food.lipides * multiplier;

      return acc;
    }, {});

    // Transformer en format pour les graphiques
    const formattedData = Object.entries(dailyTotals).map(([date, values]) => {
      // Formatter la date en JJ/MM
      const dateObj = new Date(date);
      const formattedDate = `${String(dateObj.getDate()).padStart(
        2,
        "0"
      )}/${String(dateObj.getMonth() + 1).padStart(2, "0")}`;

      return {
        date,
        glucides: {
          date: formattedDate,
          intake: Math.round(values.glucides),
          min: 330,
          max: 360,
        },
        proteines: {
          date: formattedDate,
          intake: Math.round(values.proteines),
          min: 150,
          max: 170,
        },
        lipides: {
          date: formattedDate,
          intake: Math.round(values.lipides),
          min: 70,
          max: 80,
        },
      };
    });

    // Trier par date
    formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    setDataGlucides(formattedData.map((d) => d.glucides));
    setDataProteines(formattedData.map((d) => d.proteines));
    setDataLipides(formattedData.map((d) => d.lipides));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(dataGlucides);
  console.log(dataProteines);
  console.log(dataLipides);
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">Macros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <MacroChart title="Glucides" data={dataGlucides} color="#ffcc00" />
        <MacroChart title="Protéines" data={dataProteines} color="#00c49f" />
        <MacroChart title="Lipides" data={dataLipides} color="#ff6f61" />
      </div>
    </div>
  );
}
