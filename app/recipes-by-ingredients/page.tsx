import Nav from "@/app/Nav";
import CardGroup from "@/app/recipes-by-ingredients/Cardgroup";
import { searchRecipesByIngredients } from "@/src/api/fetch-recipes";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const ingredientsSearch = searchParams?.ingredients ?? "";

  const ingredients = Array.isArray(ingredientsSearch)
    ? ingredientsSearch[0]
    : ingredientsSearch;

  const results = await searchRecipesByIngredients(ingredients);

  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
      <Nav />
      <CardGroup results={results} />
    </div>
  );
}
