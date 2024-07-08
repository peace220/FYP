const db = require('../config/db');

const selectCourse = (req, res) => {
  const { course_name } = req.body;
  const userId = req.userId; 

  const sql = 'INSERT INTO courses (user_id, course_name) VALUES (?, ?)';
  db.query(sql, [userId, course_name], (err, result) => {
    if (err) {
      return res.status(500).send('Error selecting course');
    }
    res.send('Course selected');
  });
};

const getCourses = (req, res) => {
  const userId = req.userId; 

  const sql = 'SELECT * FROM courses WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving courses');
    }
    res.status(200).json(results);
  });
};

module.exports = { selectCourse, getCourses };
