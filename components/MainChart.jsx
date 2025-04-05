"use client";

import { CartesianGrid, Line, LineChart, XAxis, Legend } from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

export default function Component(props) {
  const chartData = props.data.map((el) => {
    return {
      ...el,
      chess: (el.chess - props.tracking.chess.start) / 13,
      duolingo: (el.duolingo - props.tracking.duolingo.start) / 50,
      money: Math.round((el.money - props.tracking.money.start) / 100),
      sport: (el.sport - props.tracking.sport.start) / 2,
      rawChess: el.chess,
      rawDuolingo: el.duolingo,
      rawMoney: el.money,
      rawSport: el.sport,
      date: new Date(el.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      }),
    };
  });

  return (
    <ChartContainer config={props.tracking} style={{ width: "100%" }}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={true}
          axisLine={true}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 5)}
        />
        <ChartTooltip content={<CustomTooltip info={props.tracking} />} />
        <Line
          dataKey="chess"
          type="monotone"
          stroke="var(--color-chess)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="duolingo"
          type="monotone"
          stroke="var(--color-duolingo)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="money"
          type="monotone"
          stroke="var(--color-money)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="sport"
          type="monotone"
          stroke="var(--color-sport)"
          strokeWidth={2}
          dot={false}
        />

        <Legend verticalAlign="top" height={36} />
      </LineChart>
    </ChartContainer>
  );
}

function CustomTooltip({ payload, label, active, info }) {
  console.log(info);
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Récupère les données de l'élément survolé
    return (
      <div className="p-3 bg-gray-800 shadow-md rounded-md border border-gray-700 text-xs text-gray-200 w-36">
        <p className="font-bold text-white mb-2">{`Date: ${label}`}</p>
        <div className="space-y-1">
          <p className="flex justify-between">
            <span className="text-gray-400">Chess: </span>
            <span>
              <span
                className="font-semibold"
                style={{ color: info.chess.color }}
              >
                {data.rawChess}
              </span>
              <span style={{ color: info.chess.color }}> elo</span>
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Duolingo: </span>
            <span>
              <span
                className="font-semibold "
                style={{ color: info.duolingo.color }}
              >
                {data.rawDuolingo}
              </span>
              <span className="" style={{ color: info.duolingo.color }}>
                {" "}
                XP
              </span>
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Money: </span>
            <span>
              <span
                className="font-semibold "
                style={{ color: info.money.color }}
              >
                {Math.round(data.rawMoney)}
              </span>
              <span className="" style={{ color: info.money.color }}>
                {" "}
                €
              </span>
            </span>
          </p>

          <p className="flex justify-between">
            <span className="text-gray-400">Sport: </span>
            <span>
              <span
                className="font-semibold "
                style={{ color: info.sport.color }}
              >
                {data.rawSport}
              </span>
              <span className="" style={{ color: info.sport.color }}>
                {" "}
                séances
              </span>
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}
