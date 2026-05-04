import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Better error handling (IMPORTANT FIX)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Only logout on REAL token issues
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  }
);

export default api;