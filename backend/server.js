const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const commentRoutes = require('./routes/commentsRoutes');
const curriculumRoutes = require('./routes/curriculumRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/curriculum',curriculumRoutes);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
