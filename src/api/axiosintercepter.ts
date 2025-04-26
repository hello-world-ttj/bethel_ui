import axios from "axios";

// Declare the environment variables for TypeScript
declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_AWS_API_URL: string;
    readonly VITE_API_KEY: string;
    readonly VITE_AUTH_TOKEN: string;
    readonly VITE_APP_IMAGE_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const baseURL = import.meta.env.VITE_APP_AWS_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =localStorage.getItem("423455ehlsls");
    const apiKey = import.meta.env.VITE_API_KEY;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (apiKey) {
      config.headers["api-key"] = apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
