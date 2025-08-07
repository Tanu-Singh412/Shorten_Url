import axios from "axios";

export const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://url-shortener-kc4b.onrender.com",
});
