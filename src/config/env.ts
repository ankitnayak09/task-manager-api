import { z } from "zod";

import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("Invalid Environment variables: ", parsedEnv.error.format());
  process.exit(1);
}

const config = parsedEnv.data;
export default config;
