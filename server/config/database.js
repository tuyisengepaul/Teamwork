import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Environment {
  static dbConnection() {
    if (process.env.NODE_ENV === 'development') {
      return new Pool({
        connectionString: process.env.DEV_DB_URL,
      });
    }
    if (process.env.NODE_ENV === 'test') {
      return new Pool({
        connectionString: process.env.TEST_DB_URL,
      });
    }
    if (process.env.NODE_ENV === 'production') {
      return new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }
  }
}

export default Environment;
