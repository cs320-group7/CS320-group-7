import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { getUserIntolerances, getUserDiets } from "@/src/db/queries";
import { Checkbox } from "@nextui-org/react";
import DisplayPreferences from "./display-preferences";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = session?.user as User;

  const userID: number = +user.id;

  const userIntolerances = (await getUserIntolerances(userID))?.intolerances;

  const userDiets = (await getUserDiets(userID))?.diets;

  console.log(userIntolerances);

  return (
    <main>
      <DisplayPreferences data={userIntolerances} />
    </main>
  );
}
