import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import DropDown from "./dropdown";
import NavBar from "./navbar";
import { Input, Navbar } from "@nextui-org/react";
import HomePage from "./homepage";
import CreateForm from "./CreateForm";
import SignUpForm from "./signup/Signup";
import Nav from "@/app/Nav";
import In from "@/app/In";
import { getAllIngredients } from "@/src/db/queries";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // <div>Hello World</div> <pre>{JSON.stringify(session)}</pre>

  // if (session) {
  //   console.log((session.user as User).id);
  // }

  const ingredients = await getAllIngredients();

  // console.log(ingredients);

  return (

    <main className="light text-foreground bg-background">
      <div className="flex items-center justify-center min-h-screen">
      <SignUpForm />
      </div>
      <NavBar />
      <div className="flex flex-row min-h-screen justify-center items-center">
        <CreateForm />
      </div>
    </main>

    // <div className={"container min-h-screen min-w-full bg-gray-200"}>
    //  <Nav />
    //  <In ingredients={ingredients} />
    // </div>
    // <main className="dark text-foreground bg-background">
    //   <NavBar />
    //   <div className="flex flex-row min-h-screen justify-center items-center">
    //     <CreateForm />
    //   </div>
    // </main>

  );
}
