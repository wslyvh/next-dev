export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "development",
};

export const SERVER_CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "development",

  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

  DB_CONNECTIONSTRING: process.env.DB_CONNECTIONSTRING,
  SMTP_CONNECTIONSTRING: process.env.SMTP_CONNECTIONSTRING,

  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_FROM: process.env.SMTP_FROM,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
};
