"use client";
import MacroChart from "./MacroChart";

import { useState, useEffect } from "react";

export default function Macros() {
  const [dataGlucides, setDataGlucides] = useState([]);
  const [dataProteines, setDataProteines] = useState([]);
  const [dataLipides, setDataLipides] = useState([]);
  const [dailyFoods, setDailyFoods] = useState({});
  const [formattedData, setFormattedData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/eat");
    const data = await response.json();

    // Grouper les aliments par date
    const foodsByDate = data.eats.reduce((acc, item) => {
      const date = new Date(item.dateEaten).toISOString().split("T")[0];

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({
        name: item.food.name,
        quantity: item.quantity,
        grams: item.grams,
      });

      return acc;
    }, {});

    setDailyFoods(foodsByDate);

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
        fullDate: date,
        glucides: {
          date: formattedDate,
          intake: Math.round(values.glucides),
          min: 230,
          max: 260,
        },
        proteines: {
          date: formattedDate,
          intake: Math.round(values.proteines),
          min: 165,
          max: 190,
        },
        lipides: {
          date: formattedDate,
          intake: Math.round(values.lipides),
          min: 60,
          max: 75,
        },
      };
    });

    // Trier par date (du plus ancien au plus récent pour les graphiques)
    formattedData.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));

    setFormattedData(formattedData);

    setDataGlucides(formattedData.map((d) => d.glucides));
    setDataProteines(formattedData.map((d) => d.proteines));
    setDataLipides(formattedData.map((d) => d.lipides));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(dataGlucides);
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">Macros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <MacroChart title="Glucides" data={dataGlucides} color="#ffcc00" />
        <MacroChart title="Protéines" data={dataProteines} color="#00c49f" />
        <MacroChart title="Lipides" data={dataLipides} color="#ff6f61" />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Aliments</th>
              <th>Glucides</th>
              <th>Protéines</th>
              <th>Lipides</th>
            </tr>
          </thead>
          <tbody>
            {[...dataGlucides].reverse().map((data, index) => {
              const currentIndex = formattedData.length - 1 - index;
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data.date}</td>
                  <td>
                    {dailyFoods[formattedData[currentIndex]?.fullDate]?.map(
                      (food, foodIndex) => (
                        <div key={foodIndex}>
                          {food.name} -{" "}
                          {food.grams > 0
                            ? `${food.grams}g`
                            : `${food.quantity} portion(s)`}
                        </div>
                      )
                    )}
                  </td>
                  <td>{data.intake}g</td>
                  <td>{dataProteines[currentIndex]?.intake}g</td>
                  <td>{dataLipides[currentIndex]?.intake}g</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
