import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
