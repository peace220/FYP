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

const upload = multer({ storage: storage }).fields([
  { name: "video", maxCount: 1 },
  { name: "transcript", maxCount: 1 },
]);

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
  const course_id = req.params.courseId;
  const sql =
    "SELECT * FROM Courses WHERE status != 'disable' && user_id = ? && id = ?";
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
  const { section_id, course_id } = req.body;
  const sql =
    "UPDATE Sections SET status = 'disable' WHERE section_id = ? && course_id = ?";
  db.query(sql, [section_id, course_id], (err, result) => {
    if (err) {
      console.log(err);
    }
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

const updateVideo = (req, res) => {
  const { lecture_id, section_id, course_id } = req.body;
  const videoPath = req.files.video[0].path;
  const videoName = req.files.video[0].filename;

  const sql =
    "UPDATE videos SET name = ?, path = ? WHERE course_id = ? AND section_id = ? AND lecture_id = ?";
  db.query(
    sql,
    [videoName, videoPath, course_id, section_id, lecture_id],
    (err, result) => {
      if (err) throw err;

      if (req.files.transcript) {
        const transcriptPath = req.files.transcript[0].path;

        fs.readFile(transcriptPath, "utf8", (err, transcriptContent) => {
          if (err) throw err;

          const transcriptSql =
            "UPDATE Transcript SET transcript = ? WHERE video_id = (SELECT video_id FROM videos WHERE course_id = ? AND section_id = ? AND lecture_id = ?)";
          db.query(
            transcriptSql,
            [transcriptContent, course_id, section_id, lecture_id],
            (err) => {
              if (err) throw err;
              fs.unlinkSync(transcriptPath);
              res.json({
                message: "Video and transcript updated successfully",
              });
            }
          );
        });
      } else {
        res.json({
          message: "Video updated successfully",
        });
      }
    }
  );
};

const uploadVideo = (req, res) => {
  const { lecture_id, section_id, course_id } = req.body;
  const videoPath = req.files.video[0].path;
  const videoName = req.files.video[0].filename;

  const sql =
    "INSERT INTO videos (course_id, section_id, lecture_id, name, path) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [course_id, section_id, lecture_id, videoName, videoPath],
    (err, result) => {
      if (err) throw err;

      if (req.files.transcript) {
        const transcriptPath = req.files.transcript[0].path;
        const videoId = result.insertId;

        fs.readFile(transcriptPath, "utf8", (err, transcriptContent) => {
          if (err) throw err;

          const transcriptSql =
            "INSERT INTO Transcript (video_id, transcript) VALUES (?, ?)";
          db.query(transcriptSql, [videoId, transcriptContent], (err) => {
            if (err) throw err;
            fs.unlinkSync(transcriptPath);
            res.json({
              message: "Video and transcript uploaded successfully",
              videoId: result.insertId,
            });
          });
        });
      } else {
        res.json({
          message: "Video uploaded successfully",
          videoId: result.insertId,
        });
      }
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

const insertQuestions = async (req, res) => {
  const {
    quiz_id,
    course_id,
    section_id,
    question_type,
    question_text,
    options,
    answer,
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error starting transaction" });
    }

    db.query(
      "INSERT INTO Questions (Quiz_id, course_id, section_id, question_type, question_text, status) VALUES (?, ?, ?, ?, ?, ?)",
      [quiz_id, course_id, section_id, question_type, question_text, "active"],
      (err, questionResult) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).json({ message: "Error creating question" });
          });
        }

        const questionId = questionResult.insertId;

        if (question_type === "multiple_choice" && options) {
          const optionInsertions = options.map((option) => {
            return new Promise((resolve, reject) => {
              db.query(
                "INSERT INTO Options (question_id, option_text, is_correct, status) VALUES (?, ?, ?, ?)",
                [questionId, option.option_text, option.is_correct, "active"],
                (err) => {
                  if (err) reject(err);
                  else resolve();
                }
              );
            });
          });

          Promise.all(optionInsertions)
            .then(() => {
              db.query(
                "INSERT INTO Answers (question_id, answer_text, status) VALUES (?, ?, ?)",
                [questionId, answer, "active"],
                (err) => {
                  if (err) {
                    return db.rollback(() => {
                      console.error(err);
                      res
                        .status(500)
                        .json({ message: "Error creating answer" });
                    });
                  }

                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.error(err);
                        res
                          .status(500)
                          .json({ message: "Error committing transaction" });
                      });
                    }
                    res.status(201).json({
                      message: "Question created successfully",
                      questionId,
                    });
                  });
                }
              );
            })
            .catch((err) => {
              db.rollback(() => {
                console.error(err);
                res.status(500).json({ message: "Error creating options" });
              });
            });
        } else {
          db.query(
            "INSERT INTO Answers (question_id, answer_text, status) VALUES (?, ?, ?)",
            [questionId, answer, "active"],
            (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error(err);
                  res.status(500).json({ message: "Error creating answer" });
                });
              }

              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error(err);
                    res
                      .status(500)
                      .json({ message: "Error committing transaction" });
                  });
                }
                res.status(201).json({
                  message: "Question created successfully",
                  questionId,
                });
              });
            }
          );
        }
      }
    );
  });
};

const getQuestions = (req, res) => {
  const { quiz_id, course_id, section_id } = req.query;
  db.query(
    "SELECT q.* FROM Questions q JOIN Quiz qz ON q.Quiz_id = qz.Quiz_id WHERE qz.Quiz_id = ? AND qz.course_id = ? AND q.course_id = ? AND qz.section_id = ? AND q.section_id = ?",
    [quiz_id, course_id, course_id, section_id, section_id],
    (err, questions) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching questions" });
      }
      let processedQuestions = 0;
      if (questions.length === 0) {
        return res.json([]);
      }

      questions.forEach((question) => {
        if (question.question_type === "multiple_choice") {
          db.query(
            "SELECT * FROM Options WHERE question_id = ?",
            [question.question_id],
            (err, options) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ message: "Error fetching options" });
              }
              question.options = options;
              getAnswer();
            }
          );
        } else {
          getAnswer();
        }

        function getAnswer() {
          db.query(
            "SELECT * FROM Answers WHERE question_id = ?",
            [question.question_id],
            (err, answers) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ message: "Error fetching answers" });
              }
              question.answer = answers[0];
              processedQuestions++;
              if (processedQuestions === questions.length) {
                res.json(questions);
              }
            }
          );
        }
      });
    }
  );
};

const updateQuestions = (req, res) => {
  const {
    question_text,
    question_type,
    question_id,
    course_id,
    section_id,
    quiz_id,
    options,
    answer,
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error starting transaction" });
    }

    db.query(
      "UPDATE Questions SET question_text = ?, question_type = ?, course_id = ?, section_id = ?, Quiz_id = ? WHERE question_id = ?",
      [
        question_text,
        question_type,
        course_id,
        section_id,
        quiz_id,
        question_id,
      ],
      (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error(err);
            res.status(500).json({ message: "Error updating question" });
          });
        }

        if (question_type === "multiple_choice" && options) {
          const updateOptionPromises = options.map((option) => {
            return new Promise((resolve, reject) => {
              if (option.options_id) {
                db.query(
                  "UPDATE Options SET option_text = ?, is_correct = ? WHERE options_id = ? AND question_id = ?",
                  [
                    option.option_text,
                    option.is_correct,
                    option.options_id,
                    question_id,
                  ],
                  (err) => {
                    if (err) reject(err);
                    else resolve();
                  }
                );
              }
            });
          });

          Promise.all(updateOptionPromises)
            .then(() => updateAnswer())
            .catch((err) => {
              db.rollback(() => {
                console.error(err);
                res.status(500).json({ message: "Error updating options" });
              });
            });
        } else {
          updateAnswer();
        }

        function updateAnswer() {
          db.query(
            "UPDATE Answers SET answer_text = ? WHERE question_id = ?",
            [answer, question_id],
            (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error(err);
                  res.status(500).json({ message: "Error updating answer" });
                });
              }

              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error(err);
                    res
                      .status(500)
                      .json({ message: "Error committing transaction" });
                  });
                }
                res.json({ message: "Question updated successfully" });
              });
            }
          );
        }
      }
    );
  });
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
  updateVideo,
};
