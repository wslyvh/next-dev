import { getDbClient } from "@/utils/db";

export async function getAccount(email: string) {
  const db = await getDbClient();
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
  try {
    const db = await getDbClient();
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
