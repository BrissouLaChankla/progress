"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

export default function MacroChart({ data, color = "#8884d8", title }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ textAlign: "center", marginBottom: 10 }}>{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          {data.map((item, index) => (
            <ReferenceArea
              key={index}
              x1={item.date}
              x2={item.date}
              y1={item.min}
              y2={item.max}
              strokeOpacity={0}
              fill="green"
              fillOpacity={0.5}
            />
          ))}

          <Bar dataKey="intake" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
