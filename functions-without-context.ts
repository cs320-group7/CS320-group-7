import prisma from './client'

interface CreateUser {
  userName: string
  diets: string[]
}

export async function createUser(user: CreateUser) {
  return await prisma.user.create({
    data: {
      userName: user.userName,
      UserDiet: {
        create: { diets: user.diets }
      }
    },
  })
}

interface updateUserDiets {
  userName: string,
  diets: string[],
}

export async function updateUserDiets(user: updateUserDiets) {
  return await prisma.user.update({
    where: {
      userName: user.userName
    },
    data: {
      UserDiet: {
        update: {
          diets: user.diets
        }
      }
    }
  })
}
