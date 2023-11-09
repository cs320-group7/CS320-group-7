import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import DropDown from "./dropdown";
import NavBar from "./navbar";
import { Input } from "@nextui-org/react";
import HomePage from "./homepage";
import CreateForm from "./CreateForm";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // <div>Hello World</div> <pre>{JSON.stringify(session)}</pre>

  // if (session) {
  //   console.log((session.user as User).id);
  // }

  return (
    <main className="dark text-foreground bg-background">
      <NavBar />
      <div className="flex flex-row min-h-screen justify-center items-center">
        <CreateForm />
      </div>
    </main>
  );
}
