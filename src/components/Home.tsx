import React, { useContext, useState, useEffect } from "react";

import { GlobalPositionContext } from "../context/LocationContext";
import WeatherDisplay from "./WeatherDisplay.tsx";
import { useWeatherByLatLng } from "../api/fetchWeather";

interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  icon: string;
}

const HomePage: React.FC = () => {
  const { userPosition } = useContext(GlobalPositionContext);
  const { data, isLoading, error } = useWeatherByLatLng(
    userPosition.lat,
    userPosition.lng
  );
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (data) {
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching weather data</div>;

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <div className="bg-blue-800 w-1/2 py-6 flex flex-col items-center justify-center gap-3 font-semibold text-white">
        {weatherData && <WeatherDisplay data={weatherData} />}
      </div>
    </div>
  );
};

export default HomePage;
