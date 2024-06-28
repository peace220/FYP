const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Peacekiller2048",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

db.query("CREATE DATABASE IF NOT EXISTS userdb", (err, result) => {
  if (err) throw err;
  console.log("Database checked/created...");
  db.changeUser({ database: "userdb" }, (err) => {
    if (err) throw err;
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id int AUTO_INCREMENT,
        username VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        PRIMARY KEY(id)
      )`;
    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Users table checked/created...");
    });
  });
});

module.exports = db;
