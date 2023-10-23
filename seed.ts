import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { getUserIntolerances } from "./src/db/queries";

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
      UserIntolerance: {
        create: {
          intolerances: ["Dairy", "Egg", "Gluten"],
        },
      },
      UserDiet: {
        create: {
          diets: ["Gluten Free", "Vegan", "Primal"],
        },
      },
    },
  });

  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
