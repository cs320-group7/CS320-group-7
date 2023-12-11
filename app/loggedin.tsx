import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import Nav from "@/app/Nav";
import In from "@/app/In";
import { getAllIngredients } from "@/src/db/queries";
import {getUserEmail} from "@/src/db/queries";

export default async function LoggedIn() {
  const session = await getServerSession(authOptions);
  let userId = -1;
  let userEmail;
  if (session) {
    userId = (session.user as User).id;
    userEmail = await getUserEmail(+userId);
  }
  else{

  }
 
  const ingredients = await getAllIngredients();
  

  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
     <Nav userEmail= {userEmail}/>
     <In ingredients={ingredients}/>
     
    </div>

  );
}