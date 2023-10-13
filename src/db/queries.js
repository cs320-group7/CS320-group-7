const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async () => {
    await prisma.user.create({
        data: {
            userName: 'Caio'
        },
    })
}

const getUsers = async () => {
    console.log(await prisma.user.findMany())
}

getUsers()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
