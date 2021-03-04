import axios from "axios";
import { requestHandler, successHandler, errorHandler } from "../interceptors";
// import { BASE_URL } from "../../utils/Constants";
import { DSE_URL } from "../../utils/Constants";


// add your BASE_URL to Constants file
export const axiosInstance = axios.create({
  baseURL: DSE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Handle request process
axiosInstance.interceptors.request.use(request => requestHandler(request));
// Handle response process
axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);
