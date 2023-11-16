import prisma from "./client";
import { User } from "@prisma/client";

interface CreateUser {
  email: string;
  password: string;
  name: string;
}

export const createUser = async (userData: CreateUser) => {
  const { email, password, name } = userData;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } 
};

interface UpdateUserIntolerances {
  id: number;
  name: string;
  intolerances: string[];
}

// export const updateUserIntolerances = async (
//   user: UpdateUserIntolerances,
// ): Promise<Object> => {
//   const result = await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       name: user.name,
//       UserIntolerance: {
//         upsert: {
//           create: { intolerances: user.intolerances },
//           update: { intolerances: user.intolerances },
//         },
//       },
//     },
//   });
//   return result;
// };

// interface UpdateUserDiets {
//   id: number;
//   diets: string[];
// }
//
// export const updateUserDiets = async (
//   user: UpdateUserDiets,
// ): Promise<Object> => {
//   const result = await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       UserDiet: {
//         upsert: {
//           create: { diets: user.diets },
//           update: { diets: user.diets },
//         },
//       },
//     },
//   });
//   return result;
// };

interface UpdateUserCookbook {
  id: number;
  recipeId: number;
  title: string;
}

export const updateUserCookbook = async (
  user: UpdateUserCookbook,
): Promise<Object> => {
  const result = await prisma.user.update({
    where: { id: user.id },
    data: {
      cookBook: {
        connectOrCreate: {
          where: { id: user.recipeId },
          create: { id: user.recipeId, title: user.title },
        },
      },
    },
  });
  return result;
};

interface IAddUserIntolerance {
  id: number;
  intoleranceId: number;
}

export const updateUserIntolerance = async (
  user: IAddUserIntolerance,
): Promise<User> => {
  const result = await prisma.user.update({
    where: { id: user.id },
    data: { intolerances: { connect: { id: user.intoleranceId } } },
  });
  return result;
};
