const express = require('express');
const { postComments, getComments } = require('../controllers/commentsController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/postComments',verifyToken, postComments);
router.get('/comments', getComments);

module.exports = router;
