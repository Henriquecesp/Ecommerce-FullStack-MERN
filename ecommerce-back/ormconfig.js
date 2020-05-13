module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./src/App/Models/*.ts'],
  migrations: ['./src/Database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/Database/migrations',
  },
}
