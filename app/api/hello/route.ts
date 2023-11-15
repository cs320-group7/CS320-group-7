import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { User } from "@prisma/client";

import { addUserIntolerance, removeUserIntolerance } from "@/src/db/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get user deatails from request
  const id = searchParams.get("id");
  const state = searchParams.get("state");

  // Bad request
  if (!id || !state) {
    return new Response("Bad resquest", { status: 400 });
  }

  const session = await getServerSession(authOptions);

  // Unauthorized access
  if (!session) {
    return new Response("Unauthorized access detected", { status: 401 });
  }

  const userID = (session.user as User).id;

  // Add intolerance
  if (state === "true") {
    const res = await addUserIntolerance(+userID, +id);

    if (!res) {
      return new Response("Error", { status: 500 });
    }

    return new Response("Successfully updated profile", { status: 200 });
  } else if (state === "false") {
    const res = await removeUserIntolerance(+userID, +id);

    if (!res) {
      return new Response("Error", { status: 500 });
    }

    return new Response("Successfully updated profile", { status: 200 });
  }

  // TODO: How to handle?
  return new Response("Error", { status: 500 });
}
