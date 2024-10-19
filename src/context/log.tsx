import { createLog } from "@/services/account";
import { AUTH_OPTIONS } from "@/utils/auth";
import { getServerSession } from "next-auth/next";
import { PropsWithChildren } from "react";

export async function LogProvider(props: PropsWithChildren) {
  const session = await getServerSession(AUTH_OPTIONS);
  if (session?.user?.id) {
    await createLog(session.user.id, "Session");
  }

  return <>{props.children}</>;
}
