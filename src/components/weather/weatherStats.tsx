// src/components/weather/WeatherStats.tsx

import React from "react";
import type { WeatherData } from "../../types/weather";

interface Props {
  data: WeatherData;
}

interface StatItemProps {
  label: string;
  value: string;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div style={styles.stat}>
      <span style={styles.label}>{label}</span>
      <span style={styles.value}>{value}</span>
    </div>
  );
}

export default function WeatherStats({ data }: Props) {
  return (
    <div style={styles.grid}>
      <StatItem label="Feels Like" value={`${data.feelsLike}°C`} />
      <StatItem label="Humidity" value={`${data.humidity}%`} />
      <StatItem label="Wind Speed" value={`${data.windSpeed} m/s`} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" },
  stat: {
    background: "rgba(255,255,255,0.15)", borderRadius: "10px",
    padding: "12px", textAlign: "center", display: "flex",
    flexDirection: "column", gap: "4px",
  },
  label: { fontSize: "12px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" },
  value: { fontSize: "18px", fontWeight: 700, color: "#fff" },
};