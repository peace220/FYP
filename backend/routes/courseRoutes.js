const express = require('express');
const { selectCourse, getCourses } = require('../controllers/course/courseController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/select', verifyToken, selectCourse);
router.get('/', verifyToken, getCourses);

module.exports = router;
