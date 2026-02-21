// src/apiConfig.ts

// This automatically detects if the app is running on Render or Localhost
export const BASE_URL = import.meta.env.VITE_API_URL || "${BASE_URL}";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  SIGNUP: `${BASE_URL}/api/auth/signup`,
  // Add other common paths here if you want
};