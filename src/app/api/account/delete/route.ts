import { AUTH_OPTIONS } from "@/utils/auth";
import { getServerSession } from "next-auth/next";
import { getAccount, deleteAccount } from "@/app/services/account";

export async function POST() {
  console.log("GET /api/account");

  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user?.email) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const account = await getAccount(session.user.email);
  if (!account) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const result = await deleteAccount(session.user.email);
  if (!result) {
    return Response.json(
      { message: "Unable to delete account" },
      { status: 500 }
    );
  }

  // signOut on client-side to terminate the session
  return Response.json({ data: result, message: "Account deleted" });
}
