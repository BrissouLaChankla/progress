import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/models/user";
import connect from "@/models/connect";

export async function POST(request) {
  try {
    await connect();

    const { username, password } = await request.json();
    console.log(username, password);

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Créer et définir le cookie d'authentification
    const cookieStore = cookies();
    cookieStore.set("authToken", "votre_token_secret", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ message: "Connexion réussie" });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
