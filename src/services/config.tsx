import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8180',
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    // Adding withCredentials can help with CORS issues in some cases
    withCredentials: false
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error Response:', error);
      return Promise.reject(error);
    }
  );

export default instance;