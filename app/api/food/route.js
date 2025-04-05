import { NextResponse } from "next/server";
import Food from "@/models/Food";
import connect from "@/models/connect";
import { v2 as cloudinary } from "cloudinary";

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connect();

    const data = await req.json();
    // Upload de l'image sur Cloudinary
    console.log(data);
    let imageUrl = "";
    if (data.image) {
      try {
        // Ajout d'un log pour déboguer
        console.log("Tentative d'upload sur Cloudinary...");
        const uploadResponse = await cloudinary.uploader.upload(data.image, {
          transformation: [{ width: 100, height: 200, crop: "fill" }],
          // Ajout de quelques options pour mieux gérer l'upload
          resource_type: "auto",
          timeout: 60000,
        });
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Erreur Cloudinary:", uploadError);
        return NextResponse.json(
          { error: "Erreur lors de l'upload de l'image" },
          { status: 500 }
        );
      }
    }

    const newFood = new Food({
      name: data.name,
      calories: parseFloat(data.calories),
      proteines: parseFloat(data.proteines),
      glucides: parseFloat(data.glucides),
      lipides: parseFloat(data.lipides),
      image: imageUrl, // Ajout de l'URL de l'image
    });

    await newFood.save();

    return NextResponse.json({
      message: "Aliment ajouté avec succès",
      food: newFood,
    });
  } catch (error) {
    console.error("Erreur complète:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de l'aliment: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connect();

    const foods = await Food.find();
    return NextResponse.json({ foods });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des aliments" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connect();

    const data = await req.json();

    const food = await Food.updateOne({ name: data.name }, data);

    return NextResponse.json({ food });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'aliment" },
      { status: 500 }
    );
  }
}
