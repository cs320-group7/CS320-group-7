import { searchRecipes } from "@/src/api/fetch-recipes";
import { Button } from "@nextui-org/react";
import DisplayRecipes from "./display-recipes";

// `app/page.tsx` is the UI for the `/` URL
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const querySearch = searchParams?.query ?? "";
  const includeIngredientsSearch = searchParams?.includeIngredients ?? "";

  const query = Array.isArray(querySearch) ? querySearch[0] : querySearch;

  const includeIngredients = Array.isArray(includeIngredientsSearch)
    ? includeIngredientsSearch[0]
    : includeIngredientsSearch;

  const recipes = await searchRecipes(query, includeIngredients, null, null);

  //console.log(recipes.length);

  return (
    <>
      {" "}
      <DisplayRecipes data={recipes} />{" "}
    </>
  );
}
