import { Prisma, PrismaClient } from "@prisma/client";
const { create } = require("domain");

import prisma from "@/db";

// export type UsersIntolereances = Prisma.PromiseReturnType<
//   typeof getUserIntolerances
// >;

// export type UsersDiets = Prisma.PromiseReturnType<typeof getUserDiets>;


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

export const findUserByEmail = async (email: string) => {
  const result = prisma.user.findUnique({
    where: { email },
  });
  return result;
};

export const getUserEmail = async(userId: number)  =>{
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });

    if (user) {
      return user.email;
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error('Error fetching user email:', error);
    throw error;
  }
}

const createUserPersonalData = (
  name: string,
  email: string,
  password: string,
) => {
  return Prisma.validator<Prisma.UserCreateInput>()({
    name,
    email,
    password,
  });
};

export const getIntolerances = async () => {
  const result = await prisma.intolerance.findMany();
  return result;
};

export const addUserIntolerance = async (
  userID: number,
  intoleranceID: number,
) => {
  const result = await prisma.user.update({
    where: { id: userID },
    data: {
      intolerances: {
        connect: { id: intoleranceID },
      },
    },
  });
  return result;
};

export const removeUserIntolerance = async (
  userID: number,
  intoleranceID: number,
) => {
  const result = await prisma.user.update({
    where: { id: userID },
    data: {
      intolerances: {
        disconnect: { id: intoleranceID },
      },
    },
  });
  return result;
};

export const getAllIngredients = async () => {
  const result = await prisma.ingredient.findMany();
  return result;
};

export const getUserIntolerances = async (id: number) => {
  const result = await prisma.user
    .findUnique({
      where: { id: id },
    })
    .intolerances();
  return result;
};
export const getIngredientList = async (id: number) =>{
  return await prisma.user.findUnique({
    where: {id:id},
  }).ingredientList();
}

export const addIngredient = async(userId:number, ingredientToAdd:number)=>{
  return await prisma.user.update({
    where: {id: userId},
    data: {
      ingredientList: {
        connect: {id:ingredientToAdd}
      }
    }
  })
}


export const deleteIngredient = async(userId:number, ingredientToDelete:number) =>{
  return prisma.user.update({
    where: {id:userId},
    data:{
      ingredientList:{
        disconnect: {id:ingredientToDelete}
      }
    }
  })
}

export const connectOrCreateCookbook = async (
  id: number,
  recipeId: number,
  title: string,
  imageType: string,
) => {
  const result = await prisma.user.update({
    where: { id: id },
    data: {
      cookBook: {
        connectOrCreate: {
          where: { id: recipeId },
          create: { id: recipeId, title: title, imageType: imageType },
        },
      },
    },
  });
  return result;
};

export const getUserCookbook = async (id: number) => {
  const result = await prisma.user
    .findUnique({
      where: { id: id },
    })
    .cookBook()
    .catch((err) => console.log(err));

  return result;
};

export const disconnectCookbook = async (id: number, recipeId: number) => {
  const result = await prisma.user.update({
    where: { id: id },
    data: {
      cookBook: {
        disconnect: { id: recipeId },
      },
    },
  });
  return result;
};
// export const updateUserDiets = async (
//   id: number,
//   diets: string[],
// ): Promise<Object> => {
//   const result = await prisma.user.update({
//     where: { id: id },
//     data: {
//       userDiet: {
//         connectOrCreate: {
//           where: {id: id},
//           create: {id:},
//         },
//       },
//     },
//   });
//   return result;
// };


/*
 * Update users intolerances list if exists or create users intolerances list.
 */
// export const updateUserIntolerances = async (
//   id: number,
//   intolerances: string[],
// ): Promise<Object> => {
//   const result = await prisma.user.update({
//     where: { id: id },
//     data: {
//       UserIntolerance: {
//         upsert: {
//           create: { intolerances: intolerances },
//           update: { intolerances: intolerances },
//         },
//       },
//     },
//   });
//   return result;
// };

/*
 * Update users diets list if exists or create users diets list.
 */


/*
 * Either updates users cookbook by connecting to an existing recipe or creating recipe record.
 * */
// export const updateUserCookbook = async (
//   id: number,
//   recipeId: number,
//   title: string,
// ): Promise<Object> => {
//   const result = await prisma.user.update({
//     where: { id: id },
//     data: {
//       cookBook: {
//         connectOrCreate: {
//           where: { id: recipeId },
//           create: { id: recipeId, title: title },
//         },
//       },
//     },
//   });
//   return result;
// };



/*
 * Returns all users intolerances.
 */
// export const getUserIntolerances = async (id: number) => {
//   const result = await prisma.userIntolerance.findUnique({
//     where: {
//       userId: id,
//     },
//     select: {
//       intolerances: true,
//     },
//   });
//   return result;
// };

/*
 * Returns all users diets.
 */
// export const getUserDiets = async (id: number) => {
//   const result = await prisma.userDiet.findUnique({
//     where: {
//       userId: id,
//     },
//     select: {
//       diets: true,
//     },
//   });
//   return result;
// };

/*
 * Returns users cookbook (saved recipes).
 */
// export const getUserCookbook = async (id: number) => {
//   const result = await prisma.user
//     .findUnique({
//       where: { id: id },
//     })
//     .cookBook();
//
//   return result;
// };
