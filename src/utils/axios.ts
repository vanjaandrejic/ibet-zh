import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://ibet2.365.rs",
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
  params: {
    mobileVersion: "2.27.33",
    locale: "sr",
  },
});
