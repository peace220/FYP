const db = require("../config/db");

const insertCourse = (req, res) => {
  const { title } = req.body;
  const sql = "INSERT INTO courses (title) VALUES (?)";
  db.query(sql, [title], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
const insertSection = (req, res) => {
  const { courseId, title } = req.body;
  const sql = "INSERT INTO sections (course_id, title) VALUES (?, ?)";
  db.query(sql, [courseId, title], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
const insertCurriculumItems = (req, res) => {
  const { sectionId, type, title } = req.body;
  const sql =
    "INSERT INTO curriculum_items (section_id, type, title) VALUES (?, ?, ?)";
  db.query(sql, [sectionId, type, title], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const updateCurriculumItems = (req, res) => {
  const { title } = req.body;
  const sql = "UPDATE curriculum_items SET title = ? WHERE id = ?";
  db.query(sql, [title, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const deleteSection = (req, res) => {
  const sql = "DELETE FROM sections WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const deleteCurriculumItems = (req, res) => {
  const sql = "DELETE FROM curriculum_items WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = {
  deleteCurriculumItems,
  deleteSection,
  updateCurriculumItems,
  insertCurriculumItems,
  insertSection,
  insertCourse,
};
