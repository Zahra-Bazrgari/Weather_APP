import React from 'react';

interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  icon: string;
}

const WeatherDisplay: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <div>
      <h2>Weather in {data.location}</h2>
      <img src={data.icon} alt="weather icon" />
      <p>Temperature: {data.temperature}°C</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Wind Speed: {data.windSpeed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
