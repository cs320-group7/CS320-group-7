type RecipeData = {
  results: Array<{
    id: number;
  }>;
};

export const searchRecipes = async (
  query: string,
  includeIngredients: string,
): Promise<number[]> => {
  const searchUrl = new URL(
    "https://api.spoonacular.com/recipes/complexSearch",
  );

  searchUrl.searchParams.append("apiKey", "4c60051133c54a499fb0d966c01e78af");

  searchUrl.searchParams.append("query", query);

  searchUrl.searchParams.append("includeIngredients", includeIngredients);

  let res = await fetch(searchUrl.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const recipes = res.json() as Promise<RecipeData>;

  const recipesId: number[] = [];

  (await recipes).results.forEach((e) => recipesId.push(e.id));

  return recipesId;
};

type RecipeInformation = {
  id: number;
  title: string;
  image: string;
  imageType: string;
  sourceUrl: string;
};

export const getRecipeInformation = async (
  recipeId: number,
): Promise<RecipeInformation> => {
  const searchUrl = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/information`,
  );

  searchUrl.searchParams.append("apiKey", "4c60051133c54a499fb0d966c01e78af");

  let res = await fetch(searchUrl.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const recipe = res.json() as Promise<RecipeInformation>;

  return recipe;
};
