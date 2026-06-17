import axios from "axios";
import { API_URL } from "../config/api";

// const API_URL =
//   "http://localhost:8000/api/events";
const EVENTS_URL = `${API_URL}/events`;

const getToken = () =>
  localStorage.getItem("token");

export const getEvents = () =>
  axios.get(EVENTS_URL, {
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
    EVENTS_URL,
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
    `${EVENTS_URL}/${id}`,
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
    `${EVENTS_URL}/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`,
      },
    }
  );