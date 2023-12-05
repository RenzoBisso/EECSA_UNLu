var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db-eecsa",
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conexion exitosa");
  }
});
module.exports = connection;
