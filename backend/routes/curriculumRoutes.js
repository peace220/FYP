const express = require("express");
const {} = require("../controllers/curriculumController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/sections", insertSection);
router.put("/sections/:id", verifyToken, getCourses);

module.exports = router;
