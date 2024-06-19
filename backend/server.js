const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Peacekiller2048",
  database: "testdb",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.use(express.json());
app.use(cors());

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.post("/api/store", (req, res) => {
  const value = req.body;
  console.log(value);
  res.json({
    message: "Value stored successfully!",
    value: value,
    value2: value + "1",
  });
});

app.get("/api/values", (req, res) => {
  const query = "SELECT * FROM values";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching values from database:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
