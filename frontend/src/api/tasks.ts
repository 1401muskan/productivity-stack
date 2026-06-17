import axios from "axios";
import { API_URL } from "../config/api";

// const API_URL =
//   "http://localhost:8000/api/tasks";

const getToken = () =>
  localStorage.getItem("token");

export const getTasks = () =>
  axios.get(API_URL, {
    headers: {
      Authorization:
        `Bearer ${getToken()}`,
    },
  });

export const createTask = (
  title: string,
  description: string
) =>
  axios.post(
    API_URL,
    {
      title,
      description,
    },
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );

export const updateTask = (
  id: string,
  title: string,
  description: string,
  status: string
) =>
  axios.put(
    `${API_URL}/${id}`,
    {
      title,
      description,
      status,
    },
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );

export const deleteTask = (
  id: string
) =>
  axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );