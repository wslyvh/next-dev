import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { AuthOptions, getServerSession } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import PostgresAdapter from "@auth/pg-adapter";
import EmailProvider from "next-auth/providers/email";
import { DB_CLIENT_CONFIG } from "./db";
import { Pool } from "pg";
import { SMTP_TRANSPORT_CONFIG } from "./email";
import { SERVER_CONFIG } from "./config";

export const AUTH_OPTIONS: AuthOptions = {
  providers: [
    EmailProvider({
      server: SMTP_TRANSPORT_CONFIG,
      from: SERVER_CONFIG.SMTP_FROM,
    })
  ],
  adapter: PostgresAdapter(new Pool(DB_CLIENT_CONFIG)) as Adapter,
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, AUTH_OPTIONS);
}
