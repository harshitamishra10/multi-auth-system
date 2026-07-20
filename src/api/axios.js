// // import axios from "axios";
// import API from "../api/axios";
// const API = axios.create({
//   baseURL: "https://mern-auth-system-i4go.onrender.com/api/auth",
//   withCredentials: true,
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-auth-system-beta.vercel.app/api/auth",
  withCredentials: true,
});

export default API;