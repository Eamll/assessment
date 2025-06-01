export interface EnvironmentConfig {
  port: number;
  dataSource: 'json' | 'typeorm';
  database: {
    type: 'sqlite' | 'postgres' | 'mysql';
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    synchronize: boolean;
    logging: boolean;
  };
  jsonDbPath?: string;
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
  return {
    port: parseInt(process.env.PORT || '3001'),
    dataSource: (process.env.DATA_SOURCE as 'json' | 'typeorm') || 'json',
    database: {
      type: (process.env.DB_TYPE as 'sqlite' | 'postgres' | 'mysql') || 'sqlite',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || 'database.sqlite',
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
    },
    jsonDbPath: process.env.JSON_DB_PATH,
  };
};