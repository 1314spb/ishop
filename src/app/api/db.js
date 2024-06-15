// src/lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Leo031113',
  database: 'ISHOP',
});

export default pool;