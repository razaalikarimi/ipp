import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    // 1. Establish connection *without* selecting a database
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password2root',
    });

    const dbName = process.env.MYSQL_DATABASE || 'eisr_db';

    // 2. Create the Database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);

    // 3. Switch to the newly created Database
    await connection.query(`USE \`${dbName}\`;`);

    // 4. Create the Users table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createTableQuery);

    // Close the temporary connection
    await connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Database and users table created successfully!' 
    }, { status: 200 });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to setup database', 
      error: error.message 
    }, { status: 500 });
  }
}
