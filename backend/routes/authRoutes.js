const express = require('express');
const { signup, login, getUserProfile } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', verifyToken, getUserProfile);
module.exports = router;
