const { PrismaClient } = require("@prisma/client");
const { create } = require("domain");

const prisma = new PrismaClient();

/*
 * Create new user record.
 */
// createUser(userName: string) => Promise(obj)
export const createUser = async (userName) => {
  const result = await prisma.user.create({
    data: {
      userName: userName,
    },
  });
  return result;
};

/*
 * Update users intolerances list if exists or create users intolerances list.
 */
// updateUserIntolerances(id: number, intolerances: string[]) => Promise(obj)
export const updateUserIntolerances = async (id, intolerances) => {
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
// updateUserIntolerances(userName: number, diets: string[]) => Promise(obj)
export const updateUserDiets = async (id, diets) => {
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
// updateUserCookbook(id: number, recipeId: number, title: string) => Promise(obj)
export const updateUserCookbook = async (id, recipeId, title) => {
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
// getUserIntolerances(id: number) => Promise{obj}
export const getUserIntolerances = async (id) => {
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
// getUserDiets(id: number) => Promise{obj}
export const getUserDiets = async (id) => {
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
// getUserDiets(id: number) => Promise{obj}
export const getUserCookbook = async (id) => {
  const result = await prisma.user
    .findUnique({
      where: { id: id },
    })
    .cookBook();

  return result;
};
