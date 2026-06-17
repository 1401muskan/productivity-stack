import axios from "axios";
import { API_URL } from "../config/api";

// const API =
//   "http://localhost:8000/api/dashboard";

const DASHBOARD_URL =
  `${API_URL}/dashboard`;

const getToken = () =>
  localStorage.getItem("token");

export const getStats = () =>
  axios.get(
    `${DASHBOARD_URL}/stats`,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );