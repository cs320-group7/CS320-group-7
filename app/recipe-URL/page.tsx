import { getRecipeInformation } from "@/src/api/fetch-recipes";
import { redirect } from "next/navigation";

// `app/page.tsx` is the UI for the `/` URL
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const recipeIdSearch = searchParams?.id ?? "";

  const recipeID = Array.isArray(recipeIdSearch)
    ? recipeIdSearch[0]
    : recipeIdSearch;

  const recipeIDNum: number = +recipeID;

  const recipeURL = await getRecipeInformation(recipeIDNum);

  redirect(recipeURL.sourceUrl);
}
