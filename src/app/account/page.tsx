import LogOverview from "@/components/account/log";
import { AUTH_OPTIONS } from "@/utils/auth";
import { formatEmailName } from "@/utils/format";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(AUTH_OPTIONS);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p>Hello {formatEmailName(session?.user?.email ?? "User")} 👋</p>
      <div className="divider"></div>

      <LogOverview />
    </div>
  );
}
