const mysql = require('mysql2');
const { config } = require('../config/config.js');

const dbConnection = mysql.createConnection({
  user: 'root',
  // password: config.development.password,
  database: 'grounded_n_grits',
});
dbConnection.connect();

exports.dbConnection = dbConnection;
