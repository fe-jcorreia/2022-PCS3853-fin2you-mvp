const commonConfig = {
  type: "postgres",
  logging: false,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  // synchronize makes the db reflect the model's code
  // "synchronize": process.env.NODE_ENV !== 'production',
  synchronize: false,
  entities: ["src/application/ports/repository/*.ts"],
  migrations: ["src/migrations/*.ts"],
  cli: {
    migrationsDir: ["src/migrations"],
    entitiesDir: ["src/application/ports/repository/*.ts"],
  },
};

module.exports = [
  {
    ...commonConfig,
    host: process.env.POSTGRES_HOST_DEVELOPMENT,
    port: process.env.POSTGRES_PORT_DEVELOPMENT,
    database: "test",
    name: "development",
  },
  {
    ...commonConfig,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: "postgres",
    name: "production",
  }
];
