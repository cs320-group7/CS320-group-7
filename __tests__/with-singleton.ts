import {
  createUser,
  updateUserCookbook,
  updateUserDiets,
  updateUserIntolerances,
} from "../functions-without-context";
import { prismaMock } from "../singleton";

test("should create new user ", async () => {
  const user = {
    id: 1,
    userName: "Rich",
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    userName: "Rich",
  });
});

test("should update a users intolerances ", async () => {
  const user = {
    id: 1,
    userName: "Rich",
    intolerances: ["Dairy", "Egg", "Gluten"],
  };

  prismaMock.user.update.mockResolvedValue(user);

  await expect(updateUserIntolerances(user)).resolves.toEqual({
    id: 1,
    userName: "Rich",
    intolerances: ["Dairy", "Egg", "Gluten"],
  });
});

test("should update a users diets ", async () => {
  const user = {
    id: 1,
    userName: "Rich",
    diets: ["Gluten Free", "Vegan", "Primal"],
  };

  prismaMock.user.update.mockResolvedValue(user);

  await expect(updateUserDiets(user)).resolves.toEqual({
    id: 1,
    userName: "Rich",
    diets: ["Gluten Free", "Vegan", "Primal"],
  });
});

test("should update a users cookbook ", async () => {
  const user = {
    id: 1,
    userName: "Rich",
    recipeId: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  };

  prismaMock.user.update.mockResolvedValue(user);

  await expect(updateUserCookbook(user)).resolves.toEqual({
    id: 1,
    userName: "Rich",
    recipeId: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  });
});
