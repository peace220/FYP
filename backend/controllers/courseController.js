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

module.exports = {
  selectCourse,
  getCourses,
  enrollCourse,
  getSelectedCourseDetails,
  getEnrolledCourses,
  getPublicCourses,
};
