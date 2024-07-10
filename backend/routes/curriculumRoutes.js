const express = require("express");
const {insertCurriculum} = require("../controllers/curriculumController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/curriculum", insertCurriculum);
router.put("/sections/:id", verifyToken, getCourses);

module.exports = router;
