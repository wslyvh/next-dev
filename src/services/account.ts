import { getDbPool } from "@/utils/db";
import { SITE_DOMAIN } from "@/utils/site";

export async function getAccount(email: string) {
  const db = getDbPool();

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting account:", error);
  }
}

export async function deleteAccount(email: string) {
  const db = getDbPool();

  try {
    await db.query("DELETE FROM users WHERE email = $1", [email]);
    await db.query("DELETE FROM verification_token WHERE identifier = $1", [
      email,
    ]);

    return true;
  } catch (error) {
    console.error("Error deleting account:", error);
    return false;
  }
}

export async function createLog(userId: number, action: string, ts?: Date) {
  const db = getDbPool();

  try {
    const query = ts
      ? `
        INSERT INTO log ("userId", domain, action, timestamp)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT ("userId", domain, action, DATE(timestamp)) DO NOTHING
      `
      : `
        INSERT INTO log ("userId", domain, action, timestamp)
        VALUES ($1, $2, $3, DATE(CURRENT_TIMESTAMP))
        ON CONFLICT ("userId", domain, action, timestamp) DO NOTHING
      `;

    const params = ts
      ? [userId, SITE_DOMAIN, action, ts]
      : [userId, SITE_DOMAIN, action];

    const result = await db.query(query, params);

    return result.rowCount === 1;
  } catch (error) {
    console.error("Error logging action:", error);
    return false;
  }
}

export async function getLogs(userId: number, limit: number = 20) {
  const db = getDbPool();

  try {
    const result = await db.query(
      'SELECT * FROM log WHERE "userId" = $1 ORDER BY timestamp DESC LIMIT $2',
      [userId, limit]
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting logs:", error);
    return [];
  }
}
