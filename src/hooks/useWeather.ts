// src/hooks/useWeather.ts

import { useState } from "react";
import type { WeatherData } from "../types/weather";
import { fetchWeatherByCity } from "../services/weatherService";

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  search: (city: string) => Promise<void>;
  reset: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (city: string): Promise<void> => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setWeather(null);
    setError(null);
  };

  return { weather, loading, error, search, reset };
}