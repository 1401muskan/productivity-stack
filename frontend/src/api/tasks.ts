import axios from "axios";
import { API_URL } from "../config/api";

// const API_URL =
//   "http://localhost:8000/api/tasks";

const TASKS_URL = `${API_URL}/tasks`;

const getToken = () =>
  localStorage.getItem("token");

export const getTasks = () =>
  axios.get(TASKS_URL, {
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
    TASKS_URL,
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
    `${TASKS_URL}/${id}`,
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
    `${TASKS_URL}/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );