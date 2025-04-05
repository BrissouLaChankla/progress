import { NextResponse } from "next/server";
import connect from "@/models/connect";
import Eat from "@/models/Eat";

export async function POST(req) {
  try {
    await connect();

    const data = await req.json();

    const newEat = new Eat({
      food: data.food,
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
