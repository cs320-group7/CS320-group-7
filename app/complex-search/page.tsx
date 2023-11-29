import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { getAllIngredients } from "@/src/db/queries";
import Nav from "@/app/Nav";
import In from "@/app/complex-search/In";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // <div>Hello World</div> <pre>{JSON.stringify(session)}</pre>

  if (session) {
    console.log((session.user as User).id);
  }

  const ingredients = await getAllIngredients();

  // console.log(ingredients);

  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
      <Nav />
      <In ingredients={ingredients} />
    </div>
  );
}
