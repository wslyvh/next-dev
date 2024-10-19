import { Client, ClientConfig } from "pg";
import { SERVER_CONFIG } from "./config";

let dbClient: Client;

export const DB_CLIENT_CONFIG: ClientConfig = {
  connectionString: SERVER_CONFIG.DB_CONNECTIONSTRING,
  ssl:
    SERVER_CONFIG.NODE_ENV === "production"
      ? true
      : {
          rejectUnauthorized: false,
        },
};

export async function getDbClient() {
  if (!dbClient) {
    console.log("Init db connection..");
    dbClient = new Client(DB_CLIENT_CONFIG);
    await dbClient.connect();
  }

  return dbClient;
}

export async function verify() {
  const client = await getDbClient();

  try {
    const result = await client.query("SELECT NOW()");
    console.log("Db Connection established:", result.rows[0].now);
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    await client.end();
  }
}

export async function seed() {
  const client = await getDbClient();

  try {
    console.log("Create Next-Auth tables..");
    await client.query(createVerificationTokenTable);
    await client.query(createAccountsTable);
    await client.query(createSessionsTable);
    await client.query(createUsersTable);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    await client.end();
  }
}

const createVerificationTokenTable = `
  CREATE TABLE IF NOT EXISTS verification_token (
    identifier TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL,
    PRIMARY KEY (identifier, token)
  );`;

const createAccountsTable = `
  CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,
    PRIMARY KEY (id)
  );`;

const createSessionsTable = `
  CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );`;

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    name VARCHAR(255),
    email VARCHAR(255),
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    PRIMARY KEY (id)
  );`;
