import Favs from "@/app/cookbook/Favs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { getUserCookbook } from "@/src/db/queries";
import Nav from "@/app/Nav";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = session?.user as User;

  const userId: number = +user.id;

  const userCookbook = await getUserCookbook(userId);

  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
      <Nav userEmail={user?.email}/>
      <Favs results={userCookbook}></Favs>
    </div>
  );
}
