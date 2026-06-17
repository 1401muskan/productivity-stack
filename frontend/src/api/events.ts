import axios from "axios";

const API_URL =
  "http://localhost:8000/api/events";

const getToken = () =>
  localStorage.getItem("token");

export const getEvents = () =>
  axios.get(API_URL, {
    headers: {
      Authorization:
        `Bearer ${getToken()}`,
    },
  });

export const createEvent = (
  title: string,
  start: string,
  end: string
) =>
  axios.post(
    API_URL,
    {
      title,
      start,
      end,
    },
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );

export const updateEvent = (
  id: string,
  title: string,
  start: string,
  end: string
) =>
  axios.put(
    `${API_URL}/${id}`,
    {
      title,
      start,
      end,
    },
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );

export const deleteEvent = (
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