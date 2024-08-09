import { AUTH_OPTIONS } from "@/utils/auth";
import { formatEmailName } from "@/utils/format";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(AUTH_OPTIONS);

  return (
    <div>
      <p>Hello {formatEmailName(session?.user?.email ?? "User")}</p>
    </div>
  );
}
