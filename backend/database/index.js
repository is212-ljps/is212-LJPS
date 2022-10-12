var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD ? process.env.PASSWORD : '',
  database: "ljps_db",
});

module.exports= connection