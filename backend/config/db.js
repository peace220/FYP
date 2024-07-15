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
        status varchar(50),
        PRIMARY KEY(id)
      )`;
    db.query(createUsersTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createCoursesTableQuery = `
      CREATE TABLE IF NOT EXISTS courses (
        id int AUTO_INCREMENT,
        user_id int,
        course_name VARCHAR(255),
        description TEXT,
        status varchar(50),
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`;
    db.query(createCoursesTableQuery, (err, result) => {
      if (err) throw err;
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
    });

    const createSectionsTableQuery = `
    CREATE TABLE IF NOT EXISTS sections (
      course_id INT NOT NULL,
      section_id INT Not NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status varchar(50),
      PRIMARY KEY (course_id, section_id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
      )`;
    db.query(createSectionsTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createLecturesTableQuery = `
    CREATE TABLE IF NOT EXISTS lectures (
      lecture_id INT,
      course_id INT,
      section_id INT,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50),
      PRIMARY KEY (lecture_id, course_id, section_id),
      FOREIGN KEY(course_id, section_id) REFERENCES sections(course_id, section_id)
    )`;
    db.query(createLecturesTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createQuestionsTypeTableQuery = `
    CREATE TABLE IF NOT EXISTS QuestionTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL
  )`;
    db.query(createQuestionsTypeTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createQuestionsTableQuery = `
    CREATE TABLE IF NOT EXISTS Questions (
      question_id Int,
      course_id INT,
      section_id INT,
      type_id INT NOT NULL,
      question_text TEXT NOT NULL,
      status varchar(50),
      PRIMARY KEY (question_id, course_id, section_id),
      FOREIGN KEY (type_id) REFERENCES QuestionTypes(id) ON DELETE CASCADE,
      FOREIGN KEY(course_id, section_id) REFERENCES sections(course_id, section_id)
    )`;
    db.query(createQuestionsTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createOptionsTableQuery = `
CREATE TABLE IF NOT EXISTS Options (
  options_id INT AUTO_INCREMENT primary key,
  question_id INT,
  course_id INT,
  section_id INT,
  option_text VARCHAR(255) NOT NULL,
  status VARCHAR(50),
  FOREIGN KEY (question_id, course_id, section_id) REFERENCES Questions(question_id, course_id, section_id) ON DELETE CASCADE
)`;
    db.query(createOptionsTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createAnswersTableQuery = `
    CREATE TABLE IF NOT EXISTS Answers (
      answer_id Int AUTO_INCREMENT primary key,
      option_id INT,
      question_id INT,
      course_id INT,
      section_id INT,
      answer_text TEXT,
      status varchar(50),
      FOREIGN KEY (question_id, course_id, section_id) REFERENCES Questions(question_id, course_id, section_id) ON DELETE CASCADE,
      FOREIGN KEY (option_id) REFERENCES Options(options_id) ON DELETE CASCADE
    )`;
    db.query(createAnswersTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createUsersAnswersTableQuery = `
    CREATE TABLE IF NOT EXISTS UsersAnswers (
      userAnswer_id Int AUTO_INCREMENT primary key,
      user_id INT NOT NULL,
      question_id INT,
      course_id INT,
      section_id INT,
      selected_option_id INT,
      answer_text TEXT,
      status varchar(50),
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id, course_id, section_id) REFERENCES Questions(question_id, course_id, section_id) ON DELETE CASCADE,
      FOREIGN KEY (selected_option_id) REFERENCES Options(options_id) ON DELETE CASCADE
    )`;
    db.query(createUsersAnswersTableQuery, (err, result) => {
      if (err) throw err;
    });
  });
});

module.exports = db;
