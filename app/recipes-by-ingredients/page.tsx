import Nav from "@/app/Nav";
import CardGroup from "@/app/recipes-by-ingredients/Cardgroup";
import { searchRecipesByIngredients } from "@/src/api/fetch-recipes";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { getUserEmail } from "@/src/db/queries";

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
  const session = await getServerSession(authOptions);

  const user = session?.user as User;

  const userID: number = +user.id;
  const userEmail = await getUserEmail(+userID);
  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
      <Nav userEmail={userEmail}/>
      <CardGroup results={results} />
    </div>
  );
}
