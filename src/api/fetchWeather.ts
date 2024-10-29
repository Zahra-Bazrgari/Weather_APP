import axiosInstance from "./client";
import { useQuery } from "@tanstack/react-query";

export const useWeatherByLatLng = (lat: number | null, lon: number | null) => {
  return useQuery(
    ["weatherByLatLng", lat, lon],
    async () => {
      if (lat !== null && lon !== null) {
        const response = await axiosInstance.get("/weather", {
          params: { lat, lon, units: "metric" },
        });
        return response.data;
      }
    },
    { enabled: lat !== null && lon !== null }
  );
};

export const useWeatherByCityName = (city: string | null) => {
  return useQuery(
    ["weatherByCityName", city],
    async () => {
      if (city) {
        const response = await axiosInstance.get("/weather", {
          params: { q: city, units: "metric" },
        });
        return response.data;
      }
    },
    { enabled: Boolean(city) }
  );
};
