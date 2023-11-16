import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { Checkbox } from "@nextui-org/react";
import DisplayPreferences from "./display-preferences";
import { getIntolerances, getUserIntolerances } from "@/src/db/queries";
import { getUserEmail } from "@/src/db/queries";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = session?.user as User;

  const userID: number = +user.id;

  const intolerances = await getIntolerances();

  const userIntolerances = await getUserIntolerances(userID);

  const userIntolerancesNames = userIntolerances?.map((e) => e.id);

  const userEmail = await getUserEmail(+userID);


  return (
    <DisplayPreferences
      intolerances={intolerances}
      userIntolerances={userIntolerancesNames}
      userDiets={[""]}
      userEmail={userEmail}
    />
  );
}
