const mysql = require('mysql');
require('dotenv').config();

const sql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

sql.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  } else {
    console.log('Connected to the database !');
  }
});

module.exports = sql;