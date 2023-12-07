import Nav from "@/app/Nav";
import CardGroup from "@/app/recipes-by-ingredients/Cardgroup";
import { searchRecipesByIngredients } from "@/src/api/fetch-recipes";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const userID: number = +user.id;
  const userEmail: string = user.email

  const ingredientsSearch = searchParams?.ingredients ?? "";
  const ingredients = Array.isArray(ingredientsSearch)
    ? ingredientsSearch[0]
    : ingredientsSearch;

  const results = await searchRecipesByIngredients(ingredients);
  console.log(results);

  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
      <Nav userEmail={userEmail}/>
      <CardGroup results={results} />
    </div>
  );
}
