import {
  createUser,
  updateUserCookbook,
  updateUserIntolerance,
  // updateUserDiets,
  // updateUserIntolerances,
} from "../functions-without-context";
import { prismaMock } from "../singleton";

test("should create new user ", async () => {
  const user = {
    id: 1,
    email: "test@test.com",
    password: "test",
    name: "Rich",
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    email: "test@test.com",
    password: "test",
    name: "Rich",
  });
});

// test("should update a users intolerances ", async () => {
//   const user = {
//     id: 1,
//     email: "test@test.com",
//     password: "test",
//     name: "Rich",
//     intolerances: ["Dairy", "Egg", "Gluten"],
//   };
//
//   prismaMock.user.update.mockResolvedValue(user);
//
//   await expect(updateUserIntolerances(user)).resolves.toEqual({
//     id: 1,
//     email: "test@test.com",
//     password: "test",
//     name: "Rich",
//     intolerances: ["Dairy", "Egg", "Gluten"],
//   });
// });
//
// test("should update a users diets ", async () => {
//   const user = {
//     id: 1,
//     email: "test@test.com",
//     password: "test",
//     name: "Rich",
//     diets: ["Gluten Free", "Vegan", "Primal"],
//   };
//
//   prismaMock.user.update.mockResolvedValue(user);
//
//   await expect(updateUserDiets(user)).resolves.toEqual({
//     id: 1,
//     email: "test@test.com",
//     password: "test",
//     name: "Rich",
//     diets: ["Gluten Free", "Vegan", "Primal"],
//   });
// });

// test("should update a users cookbook ", async () => {
//   const user = {
//     id: 1,
//     email: "test@test.com",
//     password: "test",
//     name: "Rich",
//     recipeId: 716429,
//     title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
//   };
//
//   prismaMock.user.update.mockResolvedValue(user);
//
//   await expect(updateUserCookbook(user)).resolves.toEqual({
//     id: 1,
//     email: "test@test.com",
//     password: "test",
//     name: "Rich",
//     recipeId: 716429,
//     title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
//   });
// });

test("should add intolerance to user profile", async () => {
  const user = {
    id: 1,
    email: "test@test.com",
    password: "test",
    name: "Rich",
    intoleranceId: 1,
  };

  prismaMock.user.update.mockResolvedValue(user);

  await expect(updateUserIntolerance(user)).resolves.toEqual({
    id: 1,
    email: "test@test.com",
    password: "test",
    name: "Rich",
    intoleranceId: 1,
  });
});
