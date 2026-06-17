import axios from "axios";
import { API_URL } from "../config/api";

// const API_URL =
//   "http://localhost:8000/api/auth";

export const registerUser = (
  name: string,
  email: string,
  password: string
) => {
  return axios.post(
    `${API_URL}/register`,
    {
      name,
      email,
      password,
    }
  );
};

export const loginUser = (
  email: string,
  password: string
) => {
  return axios.post(
    `${API_URL}/login`,
    {
      email,
      password,
    }
  );
};