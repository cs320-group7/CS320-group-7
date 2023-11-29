import Nav from "@/app/Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { LoginButton, LogoutButton } from "@/app/auth";
import Nav2 from "@/app/Nav2";
import { Image } from "@nextui-org/react";
import Img from "@/app/Img";


export default async function Page() {
  const session = await getServerSession(authOptions);
  // <div>Hello World</div> <pre>{JSON.stringify(session)}</pre>

  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
      {session ? <Nav /> : <Nav2 />}

      <div className={"flex flex-col mt-60 ml-40 gap-5"}>
        <h1 className={"text-black text-9xl font-medium"}>PrepPal</h1>
        <p className={"text-black"}>
          Generate recipes based on ingredients you have at home. Fast and
          efficient!
        </p>
      </div>
      <Img></Img>
    </div>
  );
}
