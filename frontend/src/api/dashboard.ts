import axios from "axios";

const API =
  "http://localhost:8000/api/dashboard";

const token =
  localStorage.getItem("token");

export const getStats = () =>
  axios.get(
    `${API}/stats`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );