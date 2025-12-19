import axios from 'axios';

// Get API URL from environment variable or use proxy in development
const API_URL = process.env.REACT_APP_API_URL || '';

// Create axios instance with baseURL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

