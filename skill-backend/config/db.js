require('dotenv').config(); // only needed for local development
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10, // max 10 simultaneous connections
  queueLimit: 0,
});

connection.connect((err) => {
  if (err) {
    console.error('CONNECT FAILED', err.code);
  } else {
    console.log('CONNECTED TO DATABASE');
  }
});

module.exports = connection; // export the connection directly
