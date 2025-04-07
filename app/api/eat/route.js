import { NextResponse } from "next/server";
import connect from "@/models/connect";
import Eat from "@/models/Eat";
import Food from "@/models/Food";
export async function POST(req) {
  try {
    await connect();

    const data = await req.json();

    const newEat = new Eat({
      food: data.food,
      grams: data.grams ? parseInt(data.grams) : 0,
      quantity: data.quantity ? parseInt(data.quantity) : 0,
    });

    await newEat.save();

    return NextResponse.json({
      message: "Aliment consommé avec succès",
      eat: newEat,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement de la consommation" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connect();

    const eats = await Eat.find().populate("food");

    return NextResponse.json({ eats });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des aliments" },
      { status: 500 }
    );
  }
}
