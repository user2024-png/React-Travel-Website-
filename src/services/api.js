// ALL IMPORTS MUST BE AT TOP
import axios from "axios";

//  correct backend URL
const API_URL = "https://probable-space-waffle-97gwv6pxpgr9f76vv-5000.app.github.dev";

// Creating axios instance
const api = axios.create({
  baseURL: API_URL,
});

export default api;
