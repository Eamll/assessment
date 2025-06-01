import "reflect-metadata";
import { DataSource } from "typeorm";
import { Recipe } from "./entities/Recipe";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Recipe],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
    throw error;
  }
};