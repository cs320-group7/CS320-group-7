type RecipeData = {
  results: Array<{
    id: number;
    title: string;
    imageType: string;
  }>;
};

export interface RecipeItem {
  id: number;
  title: string;
  imageType: string;
}

export const searchRecipes = async (
  query: string,
  includeIngredients: string,
  diets: string[] | null | undefined,
  intolerances: string[] | null | undefined,
): Promise<RecipeItem[]> => {
  const searchUrl = new URL(
    "https://api.spoonacular.com/recipes/complexSearch",
  );

  searchUrl.searchParams.append("apiKey", "4c60051133c54a499fb0d966c01e78af");

  searchUrl.searchParams.append("query", query);

  searchUrl.searchParams.append("includeIngredients", includeIngredients);

  if (diets) {
    searchUrl.searchParams.append("diet", diets.join(", "));
  }

  if (intolerances) {
    searchUrl.searchParams.append(
      "intolerances",
      intolerances.map((e) => e.toLowerCase()).join(", "),
    );
  }

  console.log(searchUrl.toString());

  let res = await fetch(searchUrl.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const recipes = res.json() as Promise<RecipeData>;

  const recipeItems: RecipeItem[] = [];

  (await recipes).results.forEach((e) =>
    recipeItems.push({ id: e.id, title: e.title, imageType: e.imageType }),
  );

  return recipeItems;
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
  try {
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
  } catch (error: any) {
    console.error("Error during fetch:", error.message);
    throw error; // Re-throw the error if needed
  }
};

export interface IRecipesByIngredients {
  id: number;
  title: string;
  imageType: string;
  missedIngredientCount: number;
  missedIngredients: { name: string }[];
  usedIngredientCount: number;
  usedIngredients: { name: string }[];
}

export const searchRecipesByIngredients = async (
  ingredients: string,
): Promise<IRecipesByIngredients[]> => {
  const searchUrl = new URL(
    `https://api.spoonacular.com/recipes/findByIngredients`,
  );

  searchUrl.searchParams.append("apiKey", "4c60051133c54a499fb0d966c01e78af");

  searchUrl.searchParams.append("ingredients", ingredients);

  const res = await fetch(searchUrl.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const results = res.json() as Promise<IRecipesByIngredients[]>;

  return results;
};
