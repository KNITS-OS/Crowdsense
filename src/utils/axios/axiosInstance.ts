import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// apikey header is for supabase
axiosInstance.defaults.headers.common["apikey"] =
  process.env.REACT_APP_API_KEY;

export default axiosInstance;
