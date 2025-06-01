import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Recipe } from "./entities/Recipe";
import { getEnvironmentConfig } from "./config/environment";

const config = getEnvironmentConfig();

const createDataSourceOptions = (): DataSourceOptions => {
  const baseConfig = {
    entities: [Recipe],
    migrations: [],
    subscribers: [],
    synchronize: config.database.synchronize,
    logging: config.database.logging,
  };

  switch (config.database.type) {
    case 'postgres':
      return {
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        ...baseConfig,
      };
    case 'mysql':
      return {
        type: 'mysql',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        ...baseConfig,
      };
    case 'sqlite':
    default:
      return {
        type: 'sqlite',
        database: config.database.database || 'database.sqlite',
        ...baseConfig,
      };
  }
};

export const AppDataSource = new DataSource(createDataSourceOptions());

export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database initialized successfully");
    }
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
    throw error;
  }
};
