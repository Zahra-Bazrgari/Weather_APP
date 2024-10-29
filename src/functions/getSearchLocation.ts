import axios from "axios";

export const getSearchLocation = async (query: string) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&accept-language=fa`
    );
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      throw new Error("Location not found");
    }
  };