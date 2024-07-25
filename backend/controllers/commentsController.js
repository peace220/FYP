const db = require("../config/db");

const getComments = (req, res) => {
  const courseId = req.params.courseId;
  const sql = `
  SELECT comments.*, users.username 
  FROM comments 
  JOIN users ON comments.user_id = users.id
  Where comments.course_id = ?
`;
  db.query(sql, [courseId],(err, results) => {
    if (err) throw err;

    const comments = {};
    results.forEach((comment) => {
      comments[comment.id] = { ...comment, replies: [] };
    });
    results.forEach((comment) => {
      if (comment.parent_id) {
        comments[comment.parent_id].replies.push(comments[comment.id]);
      }
    });
    const topLevelComments = Object.values(comments).filter(
      (comment) => !comment.parent_id
    );
    res.json(topLevelComments);
  });
};

const postComments = (req, res) => {
  const userId = req.userId;
  const { text, parent_id, course_id } = req.body; 
  const sql =
    "INSERT INTO comments (user_Id, text, parent_id, course_id) VALUES (?, ?, ?, ?)"; 
  db.query(sql, [userId, text, parent_id, course_id], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, userId, text, parent_id, course_id }); 
  });
};
module.exports = { getComments, postComments };
