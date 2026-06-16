import { prisma } from "../config/prisma.js";

export const createTask = async (
  title: string,
  description: string,
  userId: string
) => {
  return prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

export const getTasks = async (
  userId: string
) => {
  return prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateTask = async (
  id: string,
  userId: string,
  title: string,
  description: string,
  status: string
) => {
  return prisma.task.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      title,
      description,
      status: status as any,
    },
  });
};

export const deleteTask = async (
  id: string,
  userId: string
) => {
  return prisma.task.deleteMany({
    where: {
      id,
      userId,
    },
  });
};