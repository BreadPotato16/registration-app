import axios from "axios";
import API_URL from "../configure/api";

const axiosClient = axios.create({
  baseURL: API_URL,  // ← will now be http://172.16.23.190/php_api/
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosClient;