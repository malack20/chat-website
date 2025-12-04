import dotenv from "dotenv";

dotenv.config();

// For now, make env variables optional so you can run the app without MongoDB.
export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "5000",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "dev_jwt_secret_change_later"
};

