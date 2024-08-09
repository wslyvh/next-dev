import { AUTH_OPTIONS } from "@/utils/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout(props: PropsWithChildren) {
  const session = await getServerSession(AUTH_OPTIONS);

  if (!session) {
    redirect("api/auth/signin");
  }

  return <>{props.children}</>;
}
