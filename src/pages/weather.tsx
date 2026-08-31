// src/pages/WeatherPage.tsx
/** @format */
'use client'

// import React from "react";
// import { useWeather } from "../hooks/useWeather";
// // import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import type { WeatherData } from "../types/weather";
// import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query'
// import { Navigate } from 'react-router-dom';
// import { Route } from "react-router-dom";

{/* <Route path="/weather" element={<Navigate to="https://weather-app-u32l.vercel.app/" replace />} /> */}
export default function WeatherPage() {
  window.location.replace('https://weather-app-u32l.vercel.app/');

  return ""
}
// export default function WeatherPage() {
//   // const { weather, loading, error, search } = useWeather();

//   interface WeatherResponse {
//     cod: string;
//     message: number;
//     cnt: number;
//     list: WeatherForecast[];
//     city: City;
//   }

//   interface WeatherForecast {
//     dt: number;
//     main: MainWeather;
//     weather: Weather[];
//     clouds: Clouds;
//     wind: Wind;
//     visibility: number;
//     pop: number;
//     rain?: Rain;
//     sys: ForecastSystem;
//     dt_txt: string;
//   }

//   interface MainWeather {
//     temp: number;
//     feels_like: number;
//     temp_min: number;
//     temp_max: number;
//     pressure: number;
//     sea_level: number;
//     grnd_level: number;
//     humidity: number;
//     temp_kf: number;
//     dew_point: number;
//   }

//   interface Weather {
//     id: number;
//     main: string;
//     description: string;
//     icon: string;
//   }

//   interface Clouds {
//     all: number;
//   }

//   interface Wind {
//     speed: number;
//     deg: number;
//     gust: number;
//   }

//   interface Rain {
//     "3h": number;
//   }

//   interface ForecastSystem {
//     pod: "d" | "n";
//   }

//   interface City {
//     id: number;
//     name: string;
//     coord: Coordinates;
//     country: string;
//     population: number;
//     timezone: number;
//     sunrise: number;
//     sunset: number;
//   }

//   interface Coordinates {
//     lat: number;
//     lon: number;
//   }

//   const { isPending, error, data } = useQuery<WeatherData>({
//     queryKey: ['repoData'],
//     queryFn: async () => {
//       const {data} = await axios.get("'https://api.openweathermap.org/data/2.5/forecast?q=lagos&appid=b40fa274562d92cd2d732057400e551f&cnt=56'");
//       return data;
//     }
//       // fetch('https://api.openweathermap.org/data/2.5/forecast?q=lagos&appid=b40fa274562d92cd2d732057400e551f&cnt=56').then((res) =>
//       //   res.json(),
//       // ),
//   })

//   console.log("data", data)

//   if (isPending) return 'Loading...'

//   if (error) return 'An error has occurred: ' + error.message

//   const queryClient = new QueryClient()

//   return (
//     <>
//       <QueryClientProvider client={queryClient}>
//         <body>blah</body>
//       </QueryClientProvider>
//     </>
//   );
// }
;