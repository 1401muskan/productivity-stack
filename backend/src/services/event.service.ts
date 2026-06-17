import { prisma } from "../config/prisma.js";

export const createEvent = async (
  title: string,
  start: string,
  end: string,
  userId: string
) => {
  return prisma.event.create({
    data: {
      title,
      start: new Date(start),
      end: new Date(end),
      userId,
    },
  });
};

export const getEvents = async (
  userId: string
) => {
  return prisma.event.findMany({
    where: {
      userId,
    },
    orderBy: {
      start: "asc",
    },
  });
};

export const updateEvent = async (
  id: string,
  title: string,
  start: string,
  end: string,
  userId: string
) => {
  return prisma.event.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      title,
      start: new Date(start),
      end: new Date(end),
    },
  });
};

export const deleteEvent = async (
  id: string,
  userId: string
) => {
  return prisma.event.deleteMany({
    where: {
      id,
      userId,
    },
  });
};