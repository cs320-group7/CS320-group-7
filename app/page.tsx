import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import { RecipeCard } from "./components/recipe_card"

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <div>Hello World</div> <pre>{JSON.stringify(session)}</pre>

      <RecipeCard title="title" img_src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png" id={5} />


    </main>
  );
}
