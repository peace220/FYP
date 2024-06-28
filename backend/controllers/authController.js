const db = require("../config/db");
const { findUserByEmail } = require("../utils/userUtils");

const signup = (req, res) => {
  const { username, email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).send("Error on the server");
    }
    if (results.length > 0) {
      return res.status(400).send("Email is already registered");
    }
    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        return res.status(500).send("Error registering user");
      }
      res.send("User registered");
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).send("Error on the server");
    }
    if (results.length === 0) {
      return res.status(404).send("No user found");
    }

    const user = results[0];

    if (password != user.password) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: 86400 }); // 24 hours
    res.status(200).send({ auth: true, token });
  });
};

const checkTable = (req, res) => {
  const sql = `SHOW TABLES LIKE 'users'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send("Table exists");
    } else {
      res.send("Table does not exist");
    }
  });
};

module.exports = { signup, login, checkTable };
