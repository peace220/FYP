const db = require("../config/db");

app.post('/api/courses', (req, res) => {
  const { course_name, description } = req.body;
  const sql = 'INSERT INTO Courses (course_name, description) VALUES (?, ?)';
  db.query(sql, [course_name, description], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/api/courses', (req, res) => {
  const sql = 'SELECT * FROM Courses';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const { course_name, description } = req.body;
  const sql = 'UPDATE Courses SET course_name = ?, description = ? WHERE course_id = ?';
  db.query(sql, [course_name, description, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Courses WHERE course_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/sections', (req, res) => {
  const { course_id, section_name } = req.body;
  const sql = 'INSERT INTO Sections (course_id, section_name) VALUES (?, ?)';
  db.query(sql, [course_id, section_name], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/api/sections', (req, res) => {
  const { course_id } = req.query;
  const sql = 'SELECT * FROM Sections WHERE course_id = ?';
  db.query(sql, [course_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put('/api/sections/:id', (req, res) => {
  const { id } = req.params;
  const { section_name } = req.body;
  const sql = 'UPDATE Sections SET section_name = ? WHERE section_id = ?';
  db.query(sql, [section_name, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/api/sections/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Sections WHERE section_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/lectures', (req, res) => {
  const { section_id, lecture_title, content } = req.body;
  const sql = 'INSERT INTO Lectures (section_id, lecture_title, content) VALUES (?, ?, ?)';
  db.query(sql, [section_id, lecture_title, content], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/api/lectures', (req, res) => {
  const { section_id } = req.query;
  const sql = 'SELECT * FROM Lectures WHERE section_id = ?';
  db.query(sql, [section_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put('/api/lectures/:id', (req, res) => {
  const { id } = req.params;
  const { lecture_title, content } = req.body;
  const sql = 'UPDATE Lectures SET lecture_title = ?, content = ? WHERE lecture_id = ?';
  db.query(sql, [lecture_title, content, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/api/lectures/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Lectures WHERE lecture_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/questions', (req, res) => {
  const { section_id, question_text, question_type_id } = req.body;
  const sql = 'INSERT INTO Questions (section_id, question_text, question_type_id) VALUES (?, ?, ?)';
  db.query(sql, [section_id, question_text, question_type_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/api/questions', (req, res) => {
  const { section_id } = req.query;
  const sql = 'SELECT * FROM Questions WHERE section_id = ?';
  db.query(sql, [section_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const { question_text, question_type_id } = req.body;
  const sql = 'UPDATE Questions SET question_text = ?, question_type_id = ? WHERE question_id = ?';
  db.query(sql, [question_text, question_type_id, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Questions WHERE question_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/answers', (req, res) => {
  const { question_id, answer_text, is_correct } = req.body;
  const sql = 'INSERT INTO Answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)';
  db.query(sql, [question_id, answer_text, is_correct], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/api/answers', (req, res) => {
  const { question_id } = req.query;
  const sql = 'SELECT * FROM Answers WHERE question_id = ?';
  db.query(sql, [question_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put('/api/answers/:id', (req, res) => {
  const { id } = req.params;
  const { answer_text, is_correct } = req.body;
  const sql = 'UPDATE Answers SET answer_text = ?, is_correct = ? WHERE answer_id = ?';
  db.query(sql, [answer_text, is_correct, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/api/answers/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Answers WHERE answer_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/quizzes', (req, res) => {
  const { course_id, quiz_name } = req.body;
  const sql = 'INSERT INTO Quizzes (course_id, quiz_name) VALUES (?, ?)';
  db.query(sql, [course_id, quiz_name], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/api/quizzes', (req, res) => {
  const { course_id } = req.query;
  const sql = 'SELECT * FROM Quizzes WHERE course_id = ?';
  db.query(sql, [course_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put('/api/quizzes/:id', (req, res) => {
  const { id } = req.params;
  const { quiz_name } = req.body;
  const sql = 'UPDATE Quizzes SET quiz_name = ? WHERE quiz_id = ?';
  db.query(sql, [quiz_name, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/api/quizzes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Quizzes WHERE quiz_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/quiz-questions', (req, res) => {
  const { quiz_id, question_id } = req.body;
  const sql = 'INSERT INTO QuizQuestions (quiz_id, question_id) VALUES (?, ?)';
  db.query(sql, [quiz_id, question_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/api/quiz-questions', (req, res) => {
  const { quiz_id } = req.query;
  const sql = 'SELECT * FROM QuizQuestions WHERE quiz_id = ?';
  db.query(sql, [quiz_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete('/api/quiz-questions/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM QuizQuestions WHERE quiz_question_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


module.exports = {
  insertCurriculum
};
