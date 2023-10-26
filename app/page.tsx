import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import { RecipeList } from "./components/recipe_list"
import { searchRecipes } from "../src/api/fetch-recipes"
import { getUserDiets, getUserIntolerances } from "@/src/db/queries"; 
import { User } from "@prisma/client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  let user: User 
  if (session) {
    user = session.user as User
    user.id = (+user.id) // cast session info to correct type
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  let diets = await getUserDiets(user.id)
  let intolerances =  await getUserIntolerances(user.id)
  const testQuery  = await searchRecipes("pasta", "tomato,onion", {diets: ["vegan"]}, null);

  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <div>Hello World</div> <pre>{JSON.stringify(session)}</pre>
      <div>diets: </div>
      {/* <div>{JSON.stringify(testQuery)}</div> */}
      <div>Query: pasta. Ingredients: tomato,cheese</div>
      <div> # Results = {testQuery.totalResults}</div>
      <RecipeList searchedRecipes={testQuery}/>
      {/* <RecipeCard title="title" img_src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png" id={5} /> */}

    </main>
  );
}
