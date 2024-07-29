const db = require("../config/db");
const jwt = require("jsonwebtoken");
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

const getUserProfile = (req, res) => {
  const userId = req.userId;
  const sql = "SELECT username FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).send("Error retrieving user profile");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(results[0]);
  });
};

const updateUsername = (req, res) => {
  const userId = req.userId;
  const { username } = req.body;
  if (!username) {
    return res.status(400).send("Username is required");
  }
  const sql = "Update users SET username  = ?  WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [username, userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  })
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error updating username");
  });
};

const updatePassword = (req, res) => {
  const userId = req.userId;
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).send("New Password is required");
  }
  const sql = "Update users SET password  = ?  WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [newPassword, userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  })
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error updating password");
  });
};

module.exports = {
  signup,
  login,
  getUserProfile,
  updateUsername,
  updatePassword,
};
