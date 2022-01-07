import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

if (process.env.REACT_APP_BACKEND_ENV === "supabase") {
  // apikey header is for supabase
  axiosInstance.defaults.headers.common["apikey"] =
    process.env.REACT_APP_API_KEY;
} else {
  axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] =
    "*";
  axiosInstance.defaults.headers.common["Access-Control-Allow-Methods"] =
    "*";
}
