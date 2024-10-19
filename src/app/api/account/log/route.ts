import { getLogs, createLog } from "@/services/account";
import { AUTH_OPTIONS } from "@/utils/auth";
import { getServerSession } from "next-auth/next";

export async function GET() {
  console.log("GET /api/account/log");

  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await getLogs(session.user.id);
  if (!result) {
    return Response.json({ message: "Failed to get logs" }, { status: 500 });
  }

  return Response.json({ data: result }, { status: 200 });
}

export async function POST() {
  console.log("POST /api/account/log");

  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await createLog(session.user.id, "Session");

  if (result) {
    return Response.json({ status: 204 });
  }

  return Response.json({ message: "Failed to log activity" }, { status: 500 });
}
