import { AUTH_OPTIONS } from "@/utils/auth";
import { getServerSession } from "next-auth/next";

export async function GET() {
  console.log("GET /api/account");

  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ data: session.user });
}
