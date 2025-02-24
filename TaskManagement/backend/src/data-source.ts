import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["dist/src/entities/*.js"],
  migrations: ["dist/src/migrations/*.js"],
  synchronize: true,
  logging: true,
});
