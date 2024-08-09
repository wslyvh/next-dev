import { AUTH_OPTIONS } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET /api/account");

  const session = await getServerSession(AUTH_OPTIONS);
  if (!session) {
    return Response.json({ data: null, message: 'Unauthorized' }, { status: 401 });
  }

  return Response.json({ data: session.user });
}
