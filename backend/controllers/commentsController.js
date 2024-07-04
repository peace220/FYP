const db = require("../config/db");

const getComments = (req, res) => {
  const sql = 'SELECT * FROM comments';
  db.query(sql, (err, results) => {
      if (err) throw err;
      const comments = results.reduce((acc, comment) => {
          if (!comment.parent_id) {
              acc.push({ ...comment, replies: [] });
          } else {
              const parent = acc.find(c => c.id === comment.parent_id);
              if (parent) {
                  parent.replies.push(comment);
              }
          }
          return acc;
      }, []);
      res.json(comments);
  });
};

const postComments = (req, res) => {
  const userId = req.userId;
  const { text, parent_id } = req.body;
  const sql =
    "INSERT INTO comments (user_Id, text, parent_id) VALUES (?, ?, ?)";
  db.query(sql, [userId, text, parent_id], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, userId, text, parent_id });
  });
};

module.exports = { getComments, postComments };
