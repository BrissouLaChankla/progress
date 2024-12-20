import MainChart from "@/components/MainChart"
import Data from '@/models/Data';
import connect from "@/models/connect"
import ProgressBar from "@/components/ProgressBar";
import { getYearProgress } from "@/utils/all";
export default async function Home() {
  await connect()
  const data = await Data.find();
  const tracking = {
    sport: {
      illu: "🏋️",
      color: "#fb923c ",
      label: "Séances de sport",
      brand: "Basic Fit",
      start: data[0].sport,
      current: data[data.length - 1].sport,
      scale: "séances",
      goal: 300,
    },
    duolingo: {
      illu: "🦉",
      color: "#4ade80 ",
      label: "Apprendre une langue",
      brand: "Duolingo",
      start: data[0].duolingo,
      current: data[data.length - 1].duolingo,
      scale: "XP",
      goal: 15000,
    },
    chess: {
      illu: "♟️",
      color: "#60a5fa",
      label: "Échecs",
      brand: "Chess.com",
      start: data[0].chess,
      current: data[data.length - 1].chess,
      scale: "elo",
      goal: 1100,
    },
    money: {
      illu: "💰",
      color: "#facc15 ",
      label: "Investissements",
      brand: "Finary",
      start: Math.round(data[0].money),
      current: Math.round(data[data.length - 1].money),
      scale: "€",
      goal: 55000,
    },
    lol: {
      illu: "🕹️",
      color: "#c084fc",
      label: "Elo Flex + SoloQ",
      brand: "League of Legends",
      start: data[0].lol,
      current: data[data.length - 1].lol,
      scale: "elo",
      goal: 2500,
    },
  }

  const totalProgress = Object.values(tracking).reduce((acc, item) => {
    const progress = (item.current - item.start) / (item.goal - item.start) * 100;
    return acc + progress;
  }, 0) / Object.values(tracking).length;



  return (
    <div className="flex flex-col lg:mt-10 items-center gap-8 max-w-screen-lg mx-auto">
      <div className="flex gap-10">
        <span>Brice : <span className="text-primary">{totalProgress.toFixed(2)}%</span></span>
        <span>{new Date().getUTCFullYear()} : <span className="text-secondary">{getYearProgress().toFixed(2)}%</span></span>
      </div>
      <MainChart data={JSON.parse(JSON.stringify(data))} tracking={tracking} />

      <div className="overflow-x-auto w-full px-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Tracked</th>
              <th>1er Janvier 2025</th>
              <th>Aujourd'hui</th>
              <th>Objectif en 365j</th>
              <th>Progression</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              Object.values(tracking).map((track, i) => <tr key={i} className="group">
                <td className="border-l-4" style={{ borderColor: track.color }}>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="text-4xl group-hover:scale-110">
                        {track.illu}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{track.label}</div>
                      <div className="text-sm opacity-50">{track.brand}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {track.start} <small>{track.scale}</small>
                </td>
                <td>
                  {track.current} <small>{track.scale}</small>
                </td>
                <td>
                  {track.goal} <small>{track.scale}</small>
                </td>
                <th>
                  <ProgressBar min={track.start} value={track.current} max={track.goal} color={track.color} />
                </th>
              </tr>)
            }

          </tbody>
        </table>
      </div>

    </div>
  );
}
