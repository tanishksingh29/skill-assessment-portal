require('dotenv').config(); // only needed for local development
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('CONNECT FAILED', err.code);
  } else {
    console.log('CONNECTED TO DATABASE');
  }
});

module.exports = connection; // export the connection directly
