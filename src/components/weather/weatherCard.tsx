// src/components/weather/WeatherCard.tsx

import React from "react";
import type { WeatherData } from "../../types/weather";
import WeatherStats from "./weatherStats";

interface Props {
  data: WeatherData;
}

export default function WeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.city}>{data.city}</h2>
          <p style={styles.country}>{data.country}</p>
        </div>
        <img src={iconUrl} alt={data.description} width={72} height={72} />
      </div>

      <div style={styles.tempRow}>
        <span style={styles.temp}>{data.temperature}°C</span>
        <span style={styles.description}>{data.description}</span>
      </div>

      <WeatherStats data={data} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "linear-gradient(135deg, #1a6fc4, #38b6ff)",
    borderRadius: "16px", padding: "24px", color: "#fff",
    boxShadow: "0 8px 32px rgba(0,112,243,0.25)",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" },
  city: { fontSize: "28px", fontWeight: 800, margin: 0 },
  country: { fontSize: "13px", opacity: 0.75, margin: "4px 0 0", letterSpacing: "2px" },
  tempRow: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" },
  temp: { fontSize: "52px", fontWeight: 300 },
  description: { fontSize: "16px", opacity: 0.85, textTransform: "capitalize" },
};