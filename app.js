//Import Express (Node JS Framework)
const express = require('express');
//Import Body Parser: To extract the Json object from the POST request.
const bodyParser = require('body-parser');
//Import Helmet package: To secure Express apps by setting various HTTP headers.
const helmet = require("helmet");
//Import MySQL package: DataBase.
const mysql = require('mysql');
//Import Dot env package: To mask connections informations.
require('dotenv').config();
//Create Express application.
const app = express();

//Create Connection to SQL database.
const sql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

//Connection to SQL database.
sql.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the database !');
});

//Cross Origin Resource Sharing Management
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Transform the data from POST method to JSon
app.use(bodyParser.json());
//HTTP headers protection
app.use(helmet());

//Import user routes.
const userRoutes = require('./routes/user');
//Serve the route for user.
app.use('/api/auth', userRoutes);

module.exports = app;