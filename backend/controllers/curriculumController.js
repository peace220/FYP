const db = require("../config/db");

const insertCourse = (req, res) => {
  const userId = req.userId;
  const { course_name, description } = req.body;
  const sql =
    "INSERT INTO Courses (user_id, course_name, description, status) VALUES (?, ?, ?, 'active')";
  db.query(sql, [userId, course_name, description], (err, result) => {
    if (err) {
      return res.status(500).send("Error inserting course");
    }
    res.send(result);
  });
};

const getCourses = (req, res) => {
  const userId = req.userId;
  const sql = "SELECT * FROM Courses WHERE status = 'active' && user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const updateCourses = (req, res) => {
  const { id, course_name, description } = req.body;
  const userId = req.userId;
  const sql =
    "UPDATE Courses SET course_name = ?, description = ? WHERE id = ? && user_id = ?";
  db.query(sql, [course_name, description, id, userId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const deleteCourses = (req, res) => {
  const { id } = req.body;
  const userId = req.userId;
  const sql =
    "UPDATE Courses SET status = 'disable' WHERE id = ? && user_id = ?";
  db.query(sql, [id, userId], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
};

const insertSection = (req, res) => {
  const { course_id, section_id, title, description } = req.body;
  const sql =
    "INSERT INTO Sections (course_id, section_id, title, description, status) VALUES (?, ?, ?, ?, 'active')";
  db.query(sql, [course_id, section_id, title, description], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const updateSection = (req, res) => {
  const { course_id, section_id, title, description } = req.body;
  const sql =
    "UPDATE Sections SET title = ?, description = ? WHERE course_id = ? && section_id = ?";
  db.query(sql, [title, description, course_id, section_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const deleteSection = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Sections WHERE section_id = ? && course_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const selectSection = (req, res) => {
  const { courseId } = req.query;
  const sql = "SELECT * FROM Sections WHERE course_id = ? && status = 'active'";
  db.query(sql, [courseId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const insertLecture = (req, res) => {
  const { section_id, lecture_title, content } = req.body;
  const sql =
    "INSERT INTO Lectures (section_id, lecture_title, content) VALUES (?, ?, ?)";
  db.query(sql, [section_id, lecture_title, content], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const selectLecture = (req, res) => {
  const { section_id } = req.query;
  const sql = "SELECT * FROM Lectures WHERE section_id = ?";
  db.query(sql, [section_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const updateLecture = (req, res) => {
  const { id } = req.params;
  const { lecture_title, content } = req.body;
  const sql =
    "UPDATE Lectures SET lecture_title = ?, content = ? WHERE lecture_id = ?";
  db.query(sql, [lecture_title, content, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const deleteLecture = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Lectures WHERE lecture_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

// app.post('/api/questions', (req, res) => {
//   const { section_id, question_text, question_type_id } = req.body;
//   const sql = 'INSERT INTO Questions (section_id, question_text, question_type_id) VALUES (?, ?, ?)';
//   db.query(sql, [section_id, question_text, question_type_id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get('/api/questions', (req, res) => {
//   const { section_id } = req.query;
//   const sql = 'SELECT * FROM Questions WHERE section_id = ?';
//   db.query(sql, [section_id], (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// app.put('/api/questions/:id', (req, res) => {
//   const { id } = req.params;
//   const { question_text, question_type_id } = req.body;
//   const sql = 'UPDATE Questions SET question_text = ?, question_type_id = ? WHERE question_id = ?';
//   db.query(sql, [question_text, question_type_id, id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.delete('/api/questions/:id', (req, res) => {
//   const { id } = req.params;
//   const sql = 'DELETE FROM Questions WHERE question_id = ?';
//   db.query(sql, [id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.post('/api/answers', (req, res) => {
//   const { question_id, answer_text, is_correct } = req.body;
//   const sql = 'INSERT INTO Answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)';
//   db.query(sql, [question_id, answer_text, is_correct], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get('/api/answers', (req, res) => {
//   const { question_id } = req.query;
//   const sql = 'SELECT * FROM Answers WHERE question_id = ?';
//   db.query(sql, [question_id], (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// app.put('/api/answers/:id', (req, res) => {
//   const { id } = req.params;
//   const { answer_text, is_correct } = req.body;
//   const sql = 'UPDATE Answers SET answer_text = ?, is_correct = ? WHERE answer_id = ?';
//   db.query(sql, [answer_text, is_correct, id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

module.exports = {
  insertCourse,
  updateCourses,
  deleteCourses,
  getCourses,
  insertLecture,
  updateLecture,
  deleteLecture,
  selectLecture,
  insertSection,
  updateSection,
  deleteSection,
  selectSection,
};
