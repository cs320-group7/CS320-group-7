import { searchRecipes } from "../api/fetch-recipes";
import {
  UsersIntolereances,
  UsersDiets,
  getUserDiets,
  getUserIntolerances,
} from "../db/queries";

class User {
  constructor() {}

  public generateRecipes = async (id: number) => {
    // const diets: UsersIntolereances = (await getUserDiets(id));

    const diets: UsersDiets = await getUserDiets(id);

    const intolerances: UsersIntolereances = await getUserIntolerances(id);

    const recipes = await searchRecipes(
      "pasta",
      "tomato, cheese",
      diets,
      intolerances,
    );
    return recipes;
  };
}
