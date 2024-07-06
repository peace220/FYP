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
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id int AUTO_INCREMENT,
        username VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        PRIMARY KEY(id)
      )`;
    db.query(createUsersTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Users table checked/created...");
    });

    const createCoursesTableQuery = `
      CREATE TABLE IF NOT EXISTS courses (
        id int AUTO_INCREMENT,
        user_id int,
        course_name VARCHAR(255),
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`;
    db.query(createCoursesTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Courses table checked/created...");
    });

    const createCommentsTableQuery = `
    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      course_id INT,
      text TEXT NOT NULL,
      parent_id INT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (parent_id) REFERENCES comments(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )`;
    db.query(createCommentsTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Courses table checked/created...");
    });
  });
});

module.exports = db;
