import { SITE_EMOJI, SITE_NAME } from "@/utils/site";
import { Link } from "@/components/link";
import { Login } from "./login";

interface Props {
  className?: string;
}

export function Navbar(props: Props) {
  let className = "navbar";
  if (props.className) className += ` ${props.className}`;

  return (
    <>
      <header className={className}>
        <div className="flex-1">
          <Link href="/">
            <h1 className="text-2xl">
              {SITE_EMOJI} {SITE_NAME}
            </h1>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Login />
        </div>
      </header>
    </>
  );
}
