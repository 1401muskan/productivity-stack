import { prisma } from "../config/prisma.js";

export const createNote = async (
  title: string,
  content: string,
  userId: string
) => {
  return prisma.note.create({
    data: {
      title,
      content,
      userId,
    },
  });
};

export const getNotes = async (
  userId: string
) => {
  return prisma.note.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getNote = async (
  id: string,
  userId: string
) => {
  return prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  });
};

// export const updateNote = async (
//   id: string,
//   userId: string,
//   title: string,
//   content: string
// ) => {
//   return prisma.note.updateMany({
//     where: {
//       id,
//       userId,
//     },
//     data: {
//       title,
//       content,
//     },
//   });
// };


export const updateNote = async (
  id: string,
  userId: string,
  title: string,
  content: string
) => {
  return prisma.note.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
};

export const deleteNote = async (
  id: string,
  userId: string
) => {
  return prisma.note.deleteMany({
    where: {
      id,
      userId,
    },
  });
};