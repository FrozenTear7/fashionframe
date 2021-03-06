import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

dotenv.config();

pg.types.setTypeParser(1114, str => str);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
