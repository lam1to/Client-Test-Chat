import axios from "axios";
import { env } from "process";

const $host = axios.create({
  baseURL: "http://localhost:4200/",
});

// const $authHost = axios.create({
//     baseURL: process.env.REACT_APP_API_URL
// })

// const authInterceptor = (config: { headers: { authorization: string } }) => {
//     config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// }

// $authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  //$authHost
};
