"use client";

import { SOCIAL_TWITTER } from "@/utils/site";
import Link from "next/link";
import { Newsletter } from "./newsletter";

interface Props {
  className?: string;
}

export function Footer(props: Props) {
  let className = "flex flex-col items-center";
  if (props.className) className += ` ${props.className}`;

  return (
    <>
      <footer className={className}>
        <Newsletter className="my-4" />

        <p className="text-xs">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by{" "}
          <Link href={`https://x.com/${SOCIAL_TWITTER}`}>{SOCIAL_TWITTER}</Link>
        </p>
      </footer>
    </>
  );
}
