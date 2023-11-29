import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { connectOrCreateCookbook } from "@/src/db/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get recipe details from request
  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const imageType = searchParams.get("imageType");

  console.log(id);
  console.log(title);
  console.log(imageType);

  // Bad request
  if (!id || !title || !imageType) {
    return new Response("Bad resquest", { status: 400 });
  }

  const session = await getServerSession(authOptions);

  // Unauthorized access
  if (!session) {
    return new Response("Unauthorized access detected", { status: 401 });
  }

  const userID = (session.user as User).id;

  const res = await connectOrCreateCookbook(+userID, +id, title, imageType);

  console.log(res);

  if (!res) {
    return new Response("Error", { status: 500 });
  }

  return new Response("Successfully updated profile", { status: 200 });
}
