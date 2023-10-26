import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}