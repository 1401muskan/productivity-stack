import axios from "axios";

const API_URL =
  "http://localhost:8000/api/notes";

const getToken = () =>
  localStorage.getItem("token");

export const getNotes = () => {
  return axios.get(API_URL, {
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
    API_URL,
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
    `${API_URL}/${id}`,
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
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};