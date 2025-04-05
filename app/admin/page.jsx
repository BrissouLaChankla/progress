"use client";
const meal = [
  {
    id: 1,
    name: "Smoothie",
    image: "/smoothie.png",
    calories: 400,
    proteines: 30,
    glucides: 45,
    lipides: 10,
  },
  {
    id: 2,
    name: "Oeufs",
    image: "/oeufs.png",
    calories: 400,
    proteines: 30,
    glucides: 45,
    lipides: 10,
  },
  {
    id: 3,
    name: "Banane",
    image: "/banane.png",
    calories: 400,
    proteines: 30,
    glucides: 45,
    lipides: 10,
  },
  {
    id: 4,
    name: "Plat Jumbo",
    image: "/plat-jumbo.png",
    calories: 400,
    proteines: 30,
    glucides: 45,
    lipides: 10,
  },
  {
    id: 5,
    name: "Holie's crunchy bar",
    image: "/holies-crunchy-bar.png",
    calories: 400,
    proteines: 30,
    glucides: 45,
    lipides: 10,
  },
  {
    id: 6,
    name: "Avocado Toast",
    image: "/avocado-toast.png",
    calories: 400,
    proteines: 30,
    glucides: 45,
    lipides: 10,
  },
  {
    id: 7,
    name: "100g de Riz",
    image: "/riz.png",
    calories: 400,
    proteines: 30,
    glucides: 45,
    lipides: 10,
  },
  {
    id: 8,
    name: "100g de légumes",
    image: "/legumes.png",
    calories: 400,
    proteines: 30,
    glucides: 45,
    lipides: 10,
  },
  {
    id: 9,
    name: "100g de viande",
    image: "/viande.png",
  },
];

import { useState, useEffect } from "react";

export default function page() {
  const [foods, setFoods] = useState([]);
  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.image instanceof File) {
      const reader = new FileReader();
      const base64 = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(data.image);
      });
      data.image = base64;
    }

    const response = await fetch("/api/food", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
  };

  const fetchFoods = async () => {
    const response = await fetch("/api/food");
    const data = await response.json();
    setFoods(data.foods);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleEat = async (id) => {
    if (!confirm("Tu viens de graille ça ?")) {
      return;
    }
    const response = await fetch(`/api/eat`, {
      method: "POST",
      body: JSON.stringify({ food: id }),
    });
    const res = await response.json();
    console.log(res);
  };

  return (
    <div className="flex flex-col lg:mt-10 items-center gap-8 max-w-screen-lg mx-auto">
      <h2 className="text-3xl mt-4 mb-2 font-bold">Je viens de manger :</h2>
      <div className="flex flex-wrap gap-4">
        {foods.map((food) => (
          <div
            key={food._id}
            onClick={() => handleEat(food._id)}
            className="cursor-pointer"
          >
            <h3 className=" text-center mt-3 font-medium text-primary mb-2">
              {food.name}
            </h3>
            <div className=" flex flex-col items-center justify-center bg-white/5 pe-4  rounded-md">
              <div className="flex gap-4">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-24 h-28 rounded-l-md object-cover"
                />
                <div className="flex flex-col justify-center">
                  <p>C - {food.calories}kcal</p>
                  <p>P - {food.proteines}g</p>
                  <p>G - {food.glucides}g</p>
                  <p>L - {food.lipides}g</p>
                </div>
              </div>
            </div>
            <h4 className="text-center mt-2">
              {getFoodScore(food).category} - {getFoodScore(food).score}
            </h4>
          </div>
        ))}
      </div>
      <h2 className="text-3xl mt-4 mb-2 font-bold">Ajouter :</h2>
      <form onSubmit={handleAdd}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              name="image"
              className="file-input file-input-bordered w-full h-full"
            />
          </div>
          <div className="col-span-7">
            <input
              type="text"
              name="name"
              placeholder="Nom de l'aliment"
              className="input input-bordered w-full"
            />
            <div className="flex mt-4 gap-2">
              <input
                required
                name="calories"
                type="number"
                step="0.1"
                placeholder="Calories"
                className="input input-bordered w-full"
              />
              <input
                required
                name="proteines"
                type="number"
                step="0.1"
                placeholder="Proteines"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex mt-4 gap-2">
              <input
                required
                name="glucides"
                type="number"
                step="0.1"
                placeholder="Glucides"
                className="input input-bordered w-full"
              />
              <input
                required
                name="lipides"
                type="number"
                step="0.1"
                placeholder="Lipides"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="col-span-1">
            <button className="btn btn-primary w-full h-full" type="submit">
              Ajouter
            </button>
          </div>
        </div>
      </form>
      <h2 className="text-3xl mt-4 mb-2 font-bold">Editer :</h2>
    </div>
  );
}

function getFoodScore({ calories, proteines, lipides }) {
  if (!calories || calories === 0) return 0;

  const score = ((proteines * 4 - lipides * 2) / calories) * 1000;

  let category = "";
  if (score >= 60) category = "🟢";
  else if (score >= 40) category = "🟡";
  else if (score >= 20) category = "🟠";
  else category = "🔴";

  return {
    score: Math.ceil(score), // arrondi au nombre supérieur
    category,
  };
}
