import axios from "axios";
import { API_URL } from "../config/api";

// const API_URL =
//   "http://localhost:8000/api/notes";
const NOTES_URL = `${API_URL}/notes`;

const getToken = () =>
  localStorage.getItem("token");

export const getNotes = () => {
  return axios.get(NOTES_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const createNote = (
  title: string,
  content: string
) => {
  return axios.post(
    NOTES_URL,
    {
      title,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const updateNote = (
  id: string,
  title: string,
  content: string
) => {
  return axios.put(
    `${NOTES_URL}/${id}`,
    {
      title,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const deleteNote = (
  id: string
) => {
  return axios.delete(
    `${NOTES_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};