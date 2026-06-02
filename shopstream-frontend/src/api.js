import axios from 'axios';

// Unified axios setup targeting your local Express server
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically inject your saved user/admin token into request headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;