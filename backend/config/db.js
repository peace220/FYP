const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
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
      order_num INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50),
      PRIMARY KEY (lecture_id, course_id, section_id),
      FOREIGN KEY(course_id, section_id) REFERENCES sections(course_id, section_id)
    )`;
    db.query(createLecturesTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createQuizQuery = `
    CREATE TABLE IF NOT EXISTS Quiz (
      Quiz_id Int,
      course_id INT,
      section_id INT,
      order_num INT NOT NULL,
      title VARCHAR(255),
      description TEXT,
      status varchar(50),
      PRIMARY KEY (Quiz_id, course_id, section_id),
      FOREIGN KEY(course_id, section_id) REFERENCES sections(course_id, section_id) ON DELETE CASCADE
    )`;
    db.query(createQuizQuery, (err, result) => {
      if (err) throw err;
    });

    const createQuestionsTableQuery = `
    CREATE TABLE IF NOT EXISTS Questions (
      question_id Int Auto_increment Primary Key,
      Quiz_id INT,
      course_id INT,
      section_id INT,
      question_type ENUM('multiple_choice', 'essay') NOT NULL,
      question_text TEXT NOT NULL,
      status varchar(50),
      FOREIGN KEY(Quiz_id, course_id, section_id) REFERENCES Quiz(Quiz_id, course_id, section_id) ON DELETE CASCADE
    )`;
    db.query(createQuestionsTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createOptionsTableQuery = `
CREATE TABLE IF NOT EXISTS Options (
  options_id INT AUTO_INCREMENT primary key,
  question_id INT,
  option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
  status VARCHAR(50),
  FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
)`;
    db.query(createOptionsTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createAnswersTableQuery = `
    CREATE TABLE IF NOT EXISTS Answers (
      answer_id Int AUTO_INCREMENT primary key,
      question_id INT,
      answer_text TEXT,
      status varchar(50),
      FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
    )`;
    db.query(createAnswersTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createUsersMultipleChoiceAnswersTableQuery = `
CREATE TABLE IF NOT EXISTS MultipleChoiceAnswers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_option_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (question_id) REFERENCES Questions(question_id),
  FOREIGN KEY (selected_option_id) REFERENCES Options(options_id)
);`;
    db.query(createUsersMultipleChoiceAnswersTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createUsersEssayAnswersTableQuery = `
CREATE TABLE IF NOT EXISTS EssayAnswers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  answer_text TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (question_id) REFERENCES Questions(question_id)
)`;
    db.query(createUsersEssayAnswersTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createVideosTableQuery = `
    CREATE TABLE IF NOT EXISTS Videos (
      video_id INT AUTO_INCREMENT PRIMARY KEY,
      course_id INT,
      section_id INT,
      lecture_id INT,
      name varchar(255) NOT NULL,
      path varchar(255) NOT NULL,
      FOREIGN KEY (lecture_id, course_id, section_id) REFERENCES lectures(lecture_id, course_id, section_id) ON DELETE CASCADE
    )`;
    db.query(createVideosTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createTranscriptTableQuery = `
    CREATE TABLE IF NOT EXISTS Transcript (
      transcript_id Int AUTO_INCREMENT primary key,
      video_id INT,
      transcript TEXT,
      FOREIGN KEY (video_id) REFERENCES Videos(video_id) ON DELETE CASCADE
    )`;
    db.query(createTranscriptTableQuery, (err, result) => {
      if (err) throw err;
    });

    const createEnrolledCoursesTableQuery = `
    CREATE TABLE IF NOT EXISTS EnrolledCourses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      course_id INT,
      status VARCHAR(50),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    )`;
    db.query(createEnrolledCoursesTableQuery, (err, result) => {
      if (err) throw err;
    });
  });
});

module.exports = db;
