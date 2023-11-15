import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      id: 1,
      email: "test@test.com",
      name: "Rich",
      password,
    },
  });

  // TODO: Delete and create (upsert)
  const intolerances = await prisma.intolerance.createMany({
    data: [
      { name: "Dairy" },
      { name: "Egg" },
      { name: "Gluten" },
      { name: "Grain" },
      { name: "Peanut" },
      { name: "Seafood" },
      { name: "Sesame" },
      { name: "Shellfish" },
      { name: "Soy" },
      { name: "Sulfite" },
      { name: "Tree Nut" },
      { name: "Wheat" },
    ],
  });

  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
