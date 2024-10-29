import axios from 'axios';
import { VITE_APP_ID } from './api.key';

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: { appid: VITE_APP_ID },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
