// src/pages/WeatherPage.tsx

import React from "react";
import { useWeather } from "../hooks/useWeather";
import WeatherSearch from "../components/weather/weatherSearch";
import WeatherCard from "../components/weather/weatherCard";

export default function WeatherPage() {
  const { weather, loading, error, search } = useWeather();

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Page Header — fits your news site's editorial tone */}
        <div style={styles.heading}>
          <h1 style={styles.title}>Weather</h1>
          <p style={styles.subtitle}>
            Stay ahead of the forecast. Search any city for live conditions.
          </p>
        </div>

        <WeatherSearch onSearch={search} loading={loading} />

        {/* Error State */}
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={styles.loading}>Fetching weather data...</div>
        )}

        {/* Result */}
        {weather && !loading && <WeatherCard data={weather} />}

        {/* Empty State */}
        {!weather && !loading && !error && (
          <div style={styles.empty}>
            Search a city above to see current weather conditions.
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", backgroundColor: "#f4f6f9", padding: "40px 16px" },
  container: { maxWidth: "600px", margin: "0 auto" },
  heading: { marginBottom: "28px" },
  title: { fontSize: "32px", fontWeight: 800, margin: "0 0 6px", color: "#111" },
  subtitle: { color: "#666", fontSize: "15px", margin: 0 },
  error: {
    background: "#fff0f0", border: "1px solid #fca5a5",
    color: "#b91c1c", borderRadius: "8px", padding: "12px 16px",
    marginBottom: "16px", fontSize: "14px",
  },
  loading: { textAlign: "center", color: "#666", padding: "40px 0" },
  empty: {
    textAlign: "center", color: "#999", padding: "48px 0",
    border: "2px dashed #ddd", borderRadius: "12px", fontSize: "15px",
  },
};