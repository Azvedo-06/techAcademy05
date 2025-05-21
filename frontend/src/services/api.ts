import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Request config:", config); // Verifique se o token está sendo enviado
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Response data:", response.data); // Adicione este log
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
