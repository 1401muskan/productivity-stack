import axios from "axios";

const API_URL =
  "http://localhost:8000/api/dashboard";

const token =
  localStorage.getItem("token");

export const getStats = () =>
  axios.get(
    `${API_URL}/stats`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );