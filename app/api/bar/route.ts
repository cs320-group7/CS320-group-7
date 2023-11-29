import { createUser } from "@/src/db/queries";
import { hash } from "bcrypt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get recipe details from request
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  // Bad request
  if (!name || !email || !password) {
    return new Response("Bad resquest", { status: 400 });
  }

  const res = await createUser(name, email, await hash(password, 12));

  if (!res) {
    return new Response("Error", { status: 500 });
  }

  return new Response("Account successfully created", { status: 200 });
}
