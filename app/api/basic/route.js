import { NextResponse } from "next/server";
import Data from "@/models/Data";
import connect from "@/models/connect";

export async function POST(req) {
    await connect();

    const { data } = await req.json();

    const lastEntry = await Data.findOne()
        .sort({ date: -1 }) // Trie par date de création décroissante
        .exec();

    // Nombre de séances depuis la dernière fois
    const seancesSince = lastEntry ? data.totalVisits - lastEntry.sport : data.totalVisits;

    const visits = data.recentVisits.slice(0, seancesSince).reverse();


    for (let i = 1; i <= seancesSince; i++) {

        const startOfDay = new Date(visits[i - 1].timestamp);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(visits[i - 1].timestamp);
        endOfDay.setUTCHours(23, 59, 59, 999);

        await Data.updateOne({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        },
            { $inc: { sport: 1 } })

    }


    return NextResponse.json({ result: data });
}


