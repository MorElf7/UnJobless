import axios from "axios";
import { BACKEND_URL } from "./config";

const apiService = axios.create({
  baseURL: BACKEND_URL,
});

apiService.interceptors.request.use(
  (request) => {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const message = error.response?.data?.message || "Unknown Error";
    return Promise.reject({ message });
  }
);

export default apiService;