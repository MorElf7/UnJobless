import dotenv from "dotenv";

const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  dotenv.config({ path: "../../.env.development" });
} else {
  dotenv.config({ path: "../../.env" });
}
export default {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/unjobless",
  isDev: isDev,
  serverName: "BACKEND-SERVER",
  api: {
    prefix: "/api",
  },
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "supersupersecretkey",
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || "supersecretsecretkey",
  saltRounds: parseInt(process.env.SALT_ROUNDS || "12"),
};
