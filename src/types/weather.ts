// src/types/weather.ts

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  condition: string;
}

export interface WeatherError {
  message: string;
}

// Raw shape returned by OpenWeatherMap
export interface OpenWeatherResponse {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: { speed: number };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  cod: number | string;
  message?: string;
}