import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-auth-system-i4go.onrender.com/api/auth",
  withCredentials: true,
});

export default API;