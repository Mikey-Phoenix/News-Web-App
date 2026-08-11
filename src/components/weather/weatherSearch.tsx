// src/components/weather/WeatherSearch.tsx

import React, { useState, type FormEvent } from "react";

interface Props {
  onSearch: (city: string) => void;
  loading: boolean;
}

export default function WeatherSearch({ onSearch, loading }: Props) {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a city (e.g. Lagos, London...)"
        style={styles.input}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !input.trim()} style={styles.button}>
        {loading ? "Searching..." : "Get Weather"}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { display: "flex", gap: "10px", marginBottom: "24px" },
  input: {
    flex: 1, padding: "12px 16px", borderRadius: "8px",
    border: "1px solid #ddd", fontSize: "15px", outline: "none",
  },
  button: {
    padding: "12px 20px", backgroundColor: "#0070f3", color: "#fff",
    border: "none", borderRadius: "8px", cursor: "pointer",
    fontWeight: 600, fontSize: "15px",
  },
};