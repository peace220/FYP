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
  const sql = "SELECT * FROM Courses WHERE status = 'active' && user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const getPublicCourses = (req, res) => {
  const sql = "SELECT * FROM Courses WHERE status = 'active'";
  db.query(sql, (err, results) => {
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

const getSelectedCourseDetails = (req, res) => {
  try {
    const courseId = req.params.courseId;
    const sql = `
    SELECT 
      c.*, 
      u.username AS creator_username 
    FROM Courses c
    JOIN Users u ON c.user_id = u.id
    WHERE c.status = 'active' && c.id = ?
  `;
    db.query(sql, [courseId], (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching course details");
      }
      if (results.length === 0) {
        return res.status(404).send("Course not found");
      }
      res.status(200).json(results[0]);
    });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
  const sql = "SELECT * FROM Sections WHERE course_id = ? && status = 'active'";
  db.query(sql, [course_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const insertLecture = (req, res) => {
  const { lecture_id, section_id, lecture_title, course_id, description } =
    req.body;
  const sql =
    "INSERT INTO Lectures (lecture_id, course_id, section_id, title, description, status) VALUES (?, ?, ?, ?, ?, 'active')";
  db.query(
    sql,
    [lecture_id, course_id, section_id, lecture_title, description],
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
    title,
    description,
    'lecture' AS type
  FROM Lectures
  WHERE section_id = ? AND course_id = ?
  UNION ALL
  SELECT 
    Quiz_id AS id,
    section_id,
    course_id,
    title,
    description,
    'quiz' AS type
  FROM Quiz
  WHERE section_id = ? AND course_id = ?
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
  db.query(sql, [title, description, lecture_id, course_id, section_id], (err, result) => {
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
  const { quiz_id, course_id, section_id, title, description } = req.body;
  const sql =
    "INSERT INTO quiz (Quiz_id, course_id, section_id, title, description, status) VALUES (?, ?, ?, ?, ?, 'active')";
  db.query(
    sql,
    [quiz_id, course_id, section_id, title, description],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
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

const enrollCourse = (req, res) => {
  const userId = req.userId;
  const { courseId } = req.body;

  const sql = "INSERT INTO EnrolledCourses (user_id, course_id, status) VALUES (?, ?, 'active')";
  db.query(sql, [userId, courseId], (err, result) => {
    if (err) {
      return res.status(500).send("Error enrolling in course");
    }
    res.send("Course enrolled successfully");
  });
};

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
  upload,
  uploadVideo,
  getVideos,
  insertCourse,
  getPublicCourses,
  getSelectedCourseDetails,
  updateCourses,
  deleteCourses,
  getCourses,
  insertLecture,
  updateLecture,
  deleteLecture,
  selectItems,
  insertSection,
  updateSection,
  deleteSection,
  selectSection,
  insertQuiz,
  enrollCourse,
};
