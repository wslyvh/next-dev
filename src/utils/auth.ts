import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { AuthOptions, getServerSession } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import PostgresAdapter from "@auth/pg-adapter";
import EmailProvider from "next-auth/providers/email";
import { Pool } from "pg";
import { SMTP_TRANSPORT_CONFIG } from "./email";
import { SERVER_CONFIG } from "./config";
import { DB_POOL_CONFIG } from "./db";
import { createLog } from "@/services/account";

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      email: string;
    };
  }
}

export const AUTH_OPTIONS: AuthOptions = {
  providers: [
    EmailProvider({
      server: SMTP_TRANSPORT_CONFIG,
      from: SERVER_CONFIG.SMTP_FROM,
    }),
  ],
  adapter: PostgresAdapter(new Pool(DB_POOL_CONFIG)) as Adapter,
  events: {
    async signIn({ user }) {
      if (user) {
        createLog(Number(user.id), "Login", new Date());
      }
    },
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = Number(user.id);
      }
      return session;
    },
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, AUTH_OPTIONS);
}
