import axios from "axios";
export const api = axios.create({
  baseURL: "https://doitjsonserver.onrender.com",
  timeout: 15000,
});
