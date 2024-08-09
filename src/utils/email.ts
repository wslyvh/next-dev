import { createTransport } from "nodemailer";
import { SERVER_CONFIG } from "./config";

export const SMTP_TRANSPORT_CONFIG = {
  host: SERVER_CONFIG.SMTP_HOST,
  from: SERVER_CONFIG.SMTP_FROM,
  auth: {
    user: SERVER_CONFIG.SMTP_USERNAME,
    pass: SERVER_CONFIG.SMTP_PASSWORD,
  },
  port: SERVER_CONFIG.SMTP_PORT,
};

export async function getSmtpClient() {
  console.log("Init stmp client..");

  return createTransport(SMTP_TRANSPORT_CONFIG);
}

export async function verify() {
  console.log("Verifying SMTP connection..");
  const transporter = await getSmtpClient();

  try {
    await transporter.verify();
    console.log("SMTP Connection established");
  } catch (err) {
    console.error("Error creating SMTP connection", err);
    return;
  }
}
