import mysql from 'mysql2/promise';

if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD || !process.env.MYSQL_DATABASE) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('[DB] Missing required MySQL environment variables. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE.');
  }
}

/**
 * Global MySQL connection pool for Next.js
 * Connections are reused, improving performance.
 */
const pool = mysql.createPool({
  host:     process.env.MYSQL_HOST     || 'localhost',
  user:     process.env.MYSQL_USER     || 'root',
  password: process.env.MYSQL_PASSWORD || 'password2root',
  database: process.env.MYSQL_DATABASE || 'eisr_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
