import postgres from 'postgres';
import { config } from 'dotenv';

config();

const port = 5432;
const postgresUser = process.env.POSTGRES_USER;
const postgresPassword = process.env.POSTGRES_PASSWORD;

export const sql = postgres({
  host: 'localhost',
  port: port,
  database: 'url_shortener',
  user: postgresUser,
  password: postgresPassword,
})
