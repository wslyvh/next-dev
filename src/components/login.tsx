import { getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "@/utils/auth";
import { Link } from "./link";
import { LoginMenu } from "./login-menu";
import { formatEmailName } from "@/utils/format";

interface Props {
  className?: string;
}

export async function Login(props: Props) {
  const session = await getServerSession(AUTH_OPTIONS);

  if (!session) {
    return (
      <Link href="api/auth/signin">
        <div role="button" className="btn btn-ghost btn-sm">
          Sign In
        </div>
      </Link>
    );
  }

  let className = "dropdown dropdown-end";
  if (props.className) className += ` ${props.className}`;

  return (
    <>
      <div className={className}>
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-2 btn btn-ghost btn-sm avatar"
        >
          <div className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>

          <span className="text-xs">
            {formatEmailName(session.user?.email ?? 'User')}
          </span>
        </div>

        <LoginMenu />
      </div>
    </>
  );
}
