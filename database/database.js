const mysql = require('mysql2');
const { config } = require('../config/config.js');

const dbConnection = mysql.createConnection({
  user: config.development.username,
  password: config.development.password,
  database: config.development.database,
});
dbConnection.connect();

exports.dbConnection = dbConnection;
