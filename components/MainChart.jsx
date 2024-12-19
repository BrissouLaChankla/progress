"use client"

import { CartesianGrid, Line, LineChart, XAxis, Legend } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"



export default function Component(props) {

    const chartData = props.data.map(el => {
        return {
            ...el,
            chess: (el.chess - props.tracking.chess.start) / 0.673, // Min = 527, Max = 1200
            duolingo: (el.duolingo - props.tracking.duolingo.start) / 14.343, // Min = 657, Max = 15000
            money: Math.round((el.money - props.tracking.money.start) / 9.626), // Min = 35374, Max = 45000
            lol: (el.lol - props.tracking.lol.start) / 0.506, // Min = 1994, Max = 2500
            sport: (el.sport - props.tracking.sport.start) / 0.1, // Min = 182, Max = 282
            date: new Date(el.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
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
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                    dataKey="chess"
                    type="monotone"
                    stroke="var(--color-chess)"
                    strokeWidth={3}
                    dot={false}
                />
                <Line
                    dataKey="duolingo"
                    type="monotone"
                    stroke="var(--color-duolingo)"
                    strokeWidth={3}
                    dot={false}
                />
                <Line
                    dataKey="money"
                    type="monotone"
                    stroke="var(--color-money)"
                    strokeWidth={3}
                    dot={false}
                />
                <Line
                    dataKey="lol"
                    type="monotone"
                    stroke="var(--color-lol)"
                    strokeWidth={3}
                    dot={false}
                />
                <Line
                    dataKey="sport"
                    type="monotone"
                    stroke="var(--color-sport)"
                    strokeWidth={3}
                    dot={false}
                />

                <Legend verticalAlign="top" height={36} />
            </LineChart>
        </ChartContainer>

    )
}
