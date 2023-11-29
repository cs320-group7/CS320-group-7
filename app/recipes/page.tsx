import {
  searchRecipes,
  searchRecipesByIngredients,
} from "@/src/api/fetch-recipes";
import Nav from "@/app/Nav";
import CardGroup from "@/app/recipes-complex/Cardgroup";
import { User } from "@prisma/client";
import { getIntolerances, getUserIntolerances } from "@/src/db/queries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  const user = session?.user as User;

  const userID: number = +user.id;

  const ingredientsSearch = searchParams?.ingredients ?? "";
  const querySearch = searchParams?.query ?? "";
  const isIntolerancesSearch = searchParams?.isIntolerances ?? "";
  const isDietsSearch = searchParams?.isDiets ?? "";

  const ingredients = Array.isArray(ingredientsSearch)
    ? ingredientsSearch[0]
    : ingredientsSearch;

  const query = Array.isArray(querySearch) ? querySearch[0] : querySearch;

  const isIntolerancees = Array.isArray(isIntolerancesSearch)
    ? isIntolerancesSearch[0]
    : isIntolerancesSearch;

  const isDiets = Array.isArray(isDietsSearch)
    ? isDietsSearch[0]
    : isDietsSearch;

  console.log(query);
  console.log(isIntolerancees);
  console.log(isDiets);
  console.log(ingredients);

  let userDiets = null;
  let userIntolerances = null;

  if (isIntolerancees === "true") {
    userIntolerances = (await getUserIntolerances(userID))?.map((e) => e.name);
  }

  if (isDiets === "true") {
    userDiets = (await getUserIntolerances(userID))?.map((e) => e.name);
  }

  console.log(userIntolerances);
  console.log(userDiets);

  const results = await searchRecipes(
    query,
    ingredients,
    userDiets,
    userIntolerances,
  );

  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
      {/*<pre className={"text-black"}> {JSON.stringify(ingredientsSearch)}</pre>*/}
      <Nav />
      <CardGroup results={results} />
    </div>
  );
}
