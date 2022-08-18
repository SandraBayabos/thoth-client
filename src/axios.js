import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("jwtToken");

axios.interceptors.request.use((config) => {
  const latestToken = localStorage.getItem("jwtToken");
  config.headers.common = {
    Authorization: `Bearer ${latestToken}`,
  };
  return config;
});
