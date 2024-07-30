const db = require("../config/db");

const selectCourse = (req, res) => {
  const { course_name } = req.body;
  const userId = req.userId;

  const sql = "INSERT INTO courses (user_id, course_name) VALUES (?, ?)";
  db.query(sql, [userId, course_name], (err, result) => {
    if (err) {
      return res.status(500).send("Error selecting course");
    }
    res.send("Course selected");
  });
};

const getCourses = (req, res) => {
  const userId = req.userId;

  const sql = "SELECT * FROM courses WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving courses");
    }
    res.status(200).json(results);
  });
};

const enrollCourse = (req, res) => {
  const userId = req.userId;
  const { courseId } = req.body;
  const sql =
    "INSERT INTO EnrolledCourses (user_id, course_id, status) VALUES (?, ?, 'active')";
  db.query(sql, [userId, courseId], (err, result) => {
    if (err) {
      return res.status(500).send("Error enrolling in course");
    }
    res.send("Course enrolled successfully");
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
    WHERE c.status = 'published' && c.id = ?
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
const getPublicCourses = (req, res) => {
  const userId = req.userId;
  const sql = `
  SELECT c.*
  FROM Courses c
  WHERE c.status = 'published'
  AND c.id NOT IN (
    SELECT ec.course_id
    FROM EnrolledCourses ec
    WHERE ec.user_id = ? AND ec.status = 'active'
  )
`;
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const getEnrolledCourses = (req, res) => {
  try {
    const userId = req.userId;
    const sql = `
      SELECT c.*
      FROM Courses c
      JOIN EnrolledCourses ec ON c.id = ec.course_id
      WHERE ec.user_id = ? AND ec.status = 'active'
    `;
    db.query(sql, [userId], (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching enrolled courses");
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkEnrollmentStatus = (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;
    const sql = `Select * from EnrolledCourses where user_id = ? && course_id = ?`;
    db.query(sql, [userId, courseId], (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching enrolled courses");
      }
      if (results.length === 0) {
        return res.status(200).json(false);
      } else {
        return res.status(200).json(true);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSelectedCoruseSections = (req, res) => {
  const courseId = req.params.courseId;
  const query = `
SELECT 
    s.section_id, 
    s.title AS section_title, 
    s.description AS section_description,
    l.lecture_id, 
    l.title AS lecture_title, 
    l.description AS lecture_description,
    l.order_num AS lecture_order,
    q.Quiz_id, 
    q.title AS quiz_title, 
    q.description AS quiz_description,
    q.order_num AS quiz_order,
    ques.question_id, 
    ques.question_type, 
    ques.question_text,
    o.options_id,
    o.option_text,
    o.is_correct,
    v.path AS video_path,
    v.video_id,
    a.answer_text
FROM sections s
LEFT JOIN lectures l ON s.course_id = l.course_id AND s.section_id = l.section_id
LEFT JOIN Quiz q ON s.course_id = q.course_id AND s.section_id = q.section_id
LEFT JOIN Questions ques ON q.Quiz_id = ques.Quiz_id AND q.course_id = ques.course_id AND q.section_id = ques.section_id
LEFT JOIN Options o ON ques.question_id = o.question_id
LEFT JOIN answers a ON ques.question_id = a.question_id
LEFT JOIN videos v ON l.lecture_id = v.lecture_id AND l.course_id = v.course_id AND l.section_id = v.section_id
WHERE s.course_id = ?
ORDER BY s.section_id, l.order_num, q.order_num, ques.question_id, o.options_id
`;

  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Error fetching course sections:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching course sections" });
    }

    const sections = [];
    let currentSection = null;
    let currentLecture = null;
    let currentQuiz = null;
    let currentQuestion = null;

    results.forEach((row) => {
      if (!currentSection || currentSection.section_id !== row.section_id) {
        currentSection = {
          section_id: row.section_id,
          title: row.section_title,
          description: row.section_description,
          contents: [],
        };
        sections.push(currentSection);
      }

      if (
        row.lecture_id &&
        (!currentLecture || currentLecture.lecture_id !== row.lecture_id)
      ) {
        currentLecture = {
          lecture_id: row.lecture_id,
          title: row.lecture_title,
          description: row.lecture_description,
          order_num: row.lecture_order,
          video_path: row.video_path,
          video_id: row.video_id,
          itemType: "lecture",
        };
        currentSection.contents.push(currentLecture);
      }

      if (
        row.Quiz_id &&
        (!currentQuiz || currentQuiz.Quiz_id !== row.Quiz_id)
      ) {
        currentQuiz = {
          Quiz_id: row.Quiz_id,
          title: row.quiz_title,
          description: row.quiz_description,
          order_num: row.quiz_order,
          itemType: "quiz",
          questions: [],
        };
        currentSection.contents.push(currentQuiz);
      }

      if (
        row.question_id &&
        (!currentQuestion || currentQuestion.question_id !== row.question_id)
      ) {
        currentQuestion = {
          question_id: row.question_id,
          question_type: row.question_type,
          question_text: row.question_text,
          answer_text: row.answer_text,
          options: [],
        };
        currentQuiz.questions.push(currentQuestion);
      }

      if (row.options_id) {
        currentQuestion.options.push({
          options_id: row.options_id,
          option_text: row.option_text,
          is_correct: row.is_correct,
        });
      }
    });

    res.json(sections);
  });
};
const getTranscript = (req, res) => {
  const videoId = req.params.videoId;
  const sql = "SELECT transcript FROM Transcript WHERE video_id = ?";

  db.query(sql, [videoId], (err, result) => {
    if (err) {
      console.error("Error fetching transcript:", err);
      return res.status(500).json({ message: "Error fetching transcript" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Transcript not found" });
    }

    res.json({ transcript: result[0].transcript });
  });
};

const storeUserAnswer = (req, res) => {
  const userId = req.userId;
  const { question_id, selected_option_id, answer_text, questionType } =
    req.body;
  let insertSql;
  let values;

  if (questionType === "multiple_choice") {
    insertSql = `
        INSERT INTO multiplechoiceanswers (user_id, question_id, selected_option_id) 
        VALUES (?, ?, ?)
      `;
    values = [userId, question_id, selected_option_id];
  } else {
    insertSql = `
        INSERT INTO essayanswers (user_id, question_id, answer_text) 
        VALUES (?, ?, ?)
      `;
    values = [userId, question_id, answer_text];
  }

  db.query(insertSql, values, (err, result) => {
    if (err) {
      return res.status(500).send("Error storing user answer");
    }
    res.json({ message: "User answer stored successfully" });
  });
};

const getPreviousAnswers = (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;

  const sql = `
    SELECT 
      q.question_id,
      q.question_type,
      COALESCE(mca.selected_option_id, ea.answer_text) AS answer,
      o.is_correct
    FROM Questions q
    LEFT JOIN Quiz qz ON q.Quiz_id = qz.Quiz_id
    LEFT JOIN MultipleChoiceAnswers mca ON q.question_id = mca.question_id AND mca.user_id = ?
    LEFT JOIN EssayAnswers ea ON q.question_id = ea.question_id AND ea.user_id = ?
    LEFT JOIN Options o ON mca.selected_option_id = o.options_id
    WHERE qz.course_id = ?
  `;

  db.query(sql, [userId, userId, courseId], (err, results) => {
    if (err) {
      console.error("Error fetching previous answers:", err);
      return res.status(500).json({ error: "Error fetching previous answers" });
    }

    const answers = {};
    results.forEach((row) => {
      answers[row.question_id] = {
        type: row.question_type,
        answer: row.answer,
        isCorrect: row.is_correct,
      };
    });

    res.json(answers);
  });
};

module.exports = {
  selectCourse,
  getCourses,
  enrollCourse,
  getSelectedCourseDetails,
  getEnrolledCourses,
  getPublicCourses,
  getSelectedCoruseSections,
  checkEnrollmentStatus,
  storeUserAnswer,
  getTranscript,
  getPreviousAnswers,
};
