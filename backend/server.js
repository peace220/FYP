const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: "Peacekiller2048"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
  db.query('CREATE DATABASE IF NOT EXISTS userdb', (err, result) => {
    if (err) throw err;
    console.log('Database checked/created...');
    db.changeUser({database : 'userdb'}, (err) => {
      if (err) throw err;
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id int AUTO_INCREMENT,
          username VARCHAR(255),
          email VARCHAR(255),
          password VARCHAR(255),
          PRIMARY KEY(id)
        )`;
      db.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Users table checked/created...');
      });
    });
  });
});

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE userdb';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Database created...');
  });
});

app.get('/createtable', (req, res) => {
  let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Users table created...');
  });
});


app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  let sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) throw err;
    res.send('User registered...');
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  let sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send('Login successful...');
    } else {
      res.status(400).send('Invalid credentials...');
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/checktable', (req, res) => {
  let sql = `SHOW TABLES LIKE 'users'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send('Table exists');
    } else {
      res.send('Table does not exist');
    }
  });
});