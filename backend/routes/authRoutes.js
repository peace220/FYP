const express = require('express');
const { signup, login, checkTable } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/checktable', checkTable);

module.exports = router;
