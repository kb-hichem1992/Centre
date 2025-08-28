import axios from "axios";

// Base URL from env with fallback
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Attach JWT from localStorage if present
axios.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token attached successfully:", token.substring(0, 20) + "...");
      console.log("Final headers:", config.headers);
    } else {
      console.log("❌ No token found in localStorage");
    }
  } catch (e) {
    console.error("❌ Error in axios interceptor:", e);
  }
  return config;
});

export default axios;
