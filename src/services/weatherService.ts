// src/services/weatherService.ts

import type { OpenWeatherResponse, WeatherData } from "../types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error("API key is missing. Check your .env file.");
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  const res = await fetch(url);
  const raw: OpenWeatherResponse = await res.json();

  if (!res.ok) {
    // OpenWeather returns error messages in raw.message
    throw new Error(raw.message || "City not found");
  }

  // Transform raw API shape → our clean WeatherData type
  return {
    city: raw.name,
    country: raw.sys.country,
    temperature: Math.round(raw.main.temp),
    feelsLike: Math.round(raw.main.feels_like),
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    description: raw.weather[0].description,
    icon: raw.weather[0].icon,
    condition: raw.weather[0].main,
  };
}