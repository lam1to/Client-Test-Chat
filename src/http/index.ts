import axios from "axios";

const $host = axios.create({
  baseURL: "http://localhost:4200/",
});

const $authHost = axios.create({
  baseURL: "http://localhost:4200/",
});

$authHost.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export { $host, $authHost };
