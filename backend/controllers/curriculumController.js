const db = require("../config/db");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const uploadsDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
  const sql = "SELECT * FROM Courses WHERE status != 'disable' && user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const getSelectedCourses = (req, res) => {
  const userId = req.userId;
  const course_id = req.params.course_id;
  const sql =
    "SELECT * FROM Courses WHERE status = 'active' && user_id = ? && course_id = ?";
  db.query(sql, [userId, course_id], (err, results) => {
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
const publishCourse = (req, res) => {
  const { course_id } = req.body;
  const sql = "UPDATE Courses SET status = 'published' WHERE id = ?";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
};

const insertSection = (req, res) => {
  const { course_id, section_id, title, description } = req.body;
  const sql =
    "INSERT INTO Sections (course_id, section_id, title, description, status) VALUES ( ?, ?, ?, ?, 'active')";
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
  const { course_id } = req.query;
  const sql =
    "SELECT * FROM Sections WHERE course_id = ? && status != 'disable'";
  db.query(sql, [course_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const insertLecture = (req, res) => {
  const {
    lecture_id,
    section_id,
    lecture_title,
    order_num,
    course_id,
    description,
  } = req.body;
  const sql =
    "INSERT INTO Lectures (lecture_id, course_id, section_id, order_num, title, description, status) VALUES (?, ?, ?, ?, ?, ?, 'active')";
  db.query(
    sql,
    [lecture_id, course_id, section_id, order_num, lecture_title, description],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const selectItems = (req, res) => {
  const { section_id, course_id } = req.query;

  const sql = `
  SELECT 
    lecture_id AS id,
    section_id,
    course_id,
    order_num,
    title,
    description,
    'lecture' AS type
  FROM Lectures
  WHERE section_id = ? && course_id = ? && status != 'disable'
  UNION ALL
  SELECT 
    Quiz_id AS id,
    section_id,
    course_id,
    order_num,
    title,
    description,
    'quiz' AS type
  FROM Quiz
  WHERE section_id = ? && course_id = ? && status != 'disable'
`;

  db.query(
    sql,
    [section_id, course_id, section_id, course_id],
    (err, results) => {
      if (err) throw err;

      res.send(results);
    }
  );
};

const updateLecture = (req, res) => {
  const { lecture_id, course_id, section_id, title, description } = req.body;
  const sql =
    "UPDATE Lectures SET title = ?, description = ? WHERE lecture_id = ? && course_id = ? && section_id = ?";
  db.query(
    sql,
    [title, description, lecture_id, course_id, section_id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const deleteLecture = (req, res) => {
  const { lecture_id, course_id, section_id } = req.body;
  const sql =
    "UPDATE Lectures SET status = 'disable' WHERE lecture_id = ? && course_id = ? && section_id = ?";
  db.query(sql, [lecture_id, course_id, section_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const uploadVideo = (req, res) => {
  const { lecture_id, section_id, course_id } = req.body;
  const videoPath = req.file.path;
  const videoName = req.file.filename;

  const sql =
    "INSERT INTO videos (course_id, section_id, lecture_id, name, path) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [course_id, section_id, lecture_id, videoName, videoPath],
    (err, result) => {
      if (err) throw err;
      res.json({
        message: "Video uploaded successfully",
        videoId: result.insertId,
      });
    }
  );
};

const insertQuiz = (req, res) => {
  const { quiz_id, course_id, section_id, order_num, title, description } =
    req.body;
  const sql =
    "INSERT INTO quiz (Quiz_id, course_id, section_id,order_num, title, description, status) VALUES (?, ?, ?, ?, ?, ?, 'active')";
  db.query(
    sql,
    [quiz_id, course_id, section_id, order_num, title, description],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const updateQuiz = (req, res) => {
  const { quiz_id, course_id, section_id, title, description } = req.body;
  const sql =
    "UPDATE quiz SET title = ?, description = ? WHERE quiz_id = ? && course_id = ? && section_id = ?";
  db.query(
    sql,
    [title, description, quiz_id, course_id, section_id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const deleteQuiz = (req, res) => {
  const { quiz_id, course_id, section_id } = req.body;
  const sql =
    "UPDATE quiz SET status = 'disable' WHERE quiz_id = ? && course_id = ? && section_id = ?";
  db.query(sql, [quiz_id, course_id, section_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getVideos = (req, res) => {
  const { course_id, section_id, lecture_id } = req.query;
  const sql =
    "SELECT * FROM videos WHERE course_id = ? && section_id = ? && lecture_id = ?";
  db.query(sql, [course_id, section_id, lecture_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const insertQuestions = (req, res) => {
  const { Quiz_id, course_id, section_id, type_id, question_text } = req.body;
  const query =
    'INSERT INTO Questions (Quiz_id, course_id, section_id, type_id, question_text, status) VALUES (?, ?, ?, ?, ?, "active")';

  db.query(
    query,
    [Quiz_id, course_id, section_id, type_id, question_text],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({
          message: "Question created successfully",
          id: result.insertId,
        });
    }
  );
};

const getQuestions = (req, res) => {
  const { course_id, section_id, quiz_id } = req.query;
  const query =
    "SELECT * FROM Questions WHERE quiz_id = ? && course_id = ? && section_id = ?";

  db.query(query, [quiz_id, course_id, section_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

const updateQuestions = (req, res) => {
  const { Quiz_id, course_id, section_id, type_id, question_text } = req.body;
  const query =
    "UPDATE Questions SET Quiz_id = ?, course_id = ?, section_id = ?, type_id = ?, question_text = ? WHERE question_id = ?";

  db.query(
    query,
    [
      Quiz_id,
      course_id,
      section_id,
      type_id,
      question_text,
      status,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Question not found" });
        return;
      }
      res.json({ message: "Question updated successfully" });
    }
  );
};

const deleteQuestions = (req, res) => {
  const { questions_id } = req.body;
  const query = 'UPDATE Questions SET status = "disabled" question_id = ?';

  db.query(query, [questions_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.json({ message: "Question deleted successfully" });
  });
};

const insertAnswers = (req, res) => {
  const { option_id, question_id, answer_text } = req.body;
  const query =
    'INSERT INTO Answers (option_id, question_id, answer_text, status) VALUES (?, ?, ?, "Active")';

  db.query(query, [option_id, question_id, answer_text], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res
      .status(201)
      .json({ message: "Answer created successfully", id: result.insertId });
  });
};

const getAnswers = (req, res) => {
  const { course_id, section_id, answer_id } = req.query;
  const query =
    "SELECT * FROM Answers WHERE answer_id = ? && course_id = ? && section_id = ?";

  db.query(query, [answer_id, course_id, section_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

const updateAnswer = (req, res) => {
  const { option_id, question_id, answer_text, asnwer_id } = req.body;
  const query =
    "UPDATE Answers SET option_id = ?, question_id = ?, answer_text = ? WHERE answer_id = ?";

  db.query(
    query,
    [option_id, question_id, answer_text, asnwer_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Answer not found" });
        return;
      }
      res.json({ message: "Answer updated successfully" });
    }
  );
};

const deleteAnswer = (req, res) => {
  const { answer_id } = req.body;
  const query = 'Update Answers SET status = "disable" where answer_id = ? ';

  db.query(query, [answer_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Answer not found" });
      return;
    }
    res.json({ message: "Answer deleted successfully" });
  });
};

const insertQuestionsOptions = (req, res) => {
  const { question_id, option_text } = req.body;
  const query =
    'INSERT INTO options (question_id, option_text, status) VALUES (?, ?, "active")';

  db.query(
    query,
    [question_id, option_text],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({
          message: "option created successfully",
          id: result.insertId,
        });
    }
  );
};

module.exports = {
  upload,
  uploadVideo,
  getVideos,
  insertCourse,
  updateCourses,
  deleteCourses,
  getCourses,
  getSelectedCourses,
  publishCourse,
  insertLecture,
  updateLecture,
  deleteLecture,
  selectItems,
  insertSection,
  updateSection,
  deleteSection,
  selectSection,
  insertQuiz,
  updateQuiz,
  deleteQuiz,
  insertQuestions,
  getQuestions,
  updateQuestions,
  deleteQuestions,
  insertAnswers,
  updateAnswer,
  deleteAnswer,
  getAnswers,
};
