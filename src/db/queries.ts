import { Prisma, PrismaClient } from "@prisma/client";
const { create } = require("domain");

const prisma = new PrismaClient();

// export type UsersIntolereances = Prisma.PromiseReturnType<>;

export const findUserByEmail = async (email: string) => {
  const result = prisma.user.findUnique({
    where: { email },
  });
  return result;
};

const createUserPersonalData = (
  name: string,
  email: string,
  password: string,
) => {
  ``;
  return Prisma.validator<Prisma.UserCreateInput>()({
    name,
    email,
    password,
  });
};

/*
 * Create new user record.
 */
export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const result = await prisma.user.create({
    data: createUserPersonalData(name, email, password),
  });
  return result;
};

/*
 * Update users intolerances list if exists or create users intolerances list.
 */
export const updateUserIntolerances = async (
  id: number,
  intolerances: string[],
): Promise<Object> => {
  const result = await prisma.user.update({
    where: { id: id },
    data: {
      UserIntolerance: {
        upsert: {
          create: { intolerances: intolerances },
          update: { intolerances: intolerances },
        },
      },
    },
  });
  return result;
};

/*
 * Update users diets list if exists or create users diets list.
 */
export const updateUserDiets = async (
  id: number,
  diets: string[],
): Promise<Object> => {
  const result = await prisma.user.update({
    where: { id: id },
    data: {
      UserDiet: {
        upsert: {
          create: { diets: diets },
          update: { diets: diets },
        },
      },
    },
  });
  return result;
};

/*
 * Either updates users cookbook by connecting to an existing recipe or creating recipe record.
 * */
export const updateUserCookbook = async (
  id: number,
  recipeId: number,
  title: string,
): Promise<Object> => {
  const result = await prisma.user.update({
    where: { id: id },
    data: {
      cookBook: {
        connectOrCreate: {
          where: { id: recipeId },
          create: { id: recipeId, title: title },
        },
      },
    },
  });
  return result;
};

/*
 * Returns all users intolerances.
 */
export const getUserIntolerances = async (id: number) => {
  const result = await prisma.userIntolerance.findUnique({
    where: {
      userId: id,
    },
    select: {
      intolerances: true,
    },
  });
  return result;
};

/*
 * Returns all users diets.
 */
export const getUserDiets = async (id: number) => {
  const result = await prisma.userDiet.findUnique({
    where: {
      userId: id,
    },
    select: {
      diets: true,
    },
  });
  return result;
};

/*
 * Returns users cookbook (saved recipes).
 */
export const getUserCookbook = async (id: number) => {
  const result = await prisma.user
    .findUnique({
      where: { id: id },
    })
    .cookBook();

  return result;
};
