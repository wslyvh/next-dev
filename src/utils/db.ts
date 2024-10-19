import { Pool, PoolConfig } from "pg";
import { SERVER_CONFIG } from "./config";

let dbPool: Pool;

export const DB_POOL_CONFIG: PoolConfig = {
  connectionString: SERVER_CONFIG.DB_CONNECTIONSTRING,
  ssl:
    SERVER_CONFIG.NODE_ENV === "production"
      ? true
      : {
          rejectUnauthorized: false,
        },
  max: 20, // max. number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
};

export function getDbPool(): Pool {
  if (!dbPool) {
    console.log("Initializing db connection pool...");
    dbPool = new Pool(DB_POOL_CONFIG);

    dbPool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
    });
  }

  return dbPool;
}

export async function verify(): Promise<void> {
  const pool = getDbPool();

  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Db Connection established:", result.rows[0].now);
  } catch (err) {
    console.error("Error verifying database connection", err);
  }
}

export async function initDbTables(): Promise<void> {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    console.log("Creating Next-auth tables...");
    await client.query(createVerificationTokenTable);
    await client.query(createAccountsTable);
    await client.query(createSessionsTable);
    await client.query(createUsersTable);

    console.log("Creating other tables...");
    await client.query(createLogTable);

    await client.query("COMMIT");
    console.log("Tables created successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error creating tables", err);
  } finally {
    client.release();
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

const createLogTable = `
  CREATE TABLE IF NOT EXISTS log (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    domain VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES users(id) ON DELETE CASCADE
  );`;
