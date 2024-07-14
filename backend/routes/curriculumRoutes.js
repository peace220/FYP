const express = require("express");
const {
  getCourses,insertCourse,updateCourses,deleteCourses,
  insertSection,updateSection,deleteSection,selectSection,
  deleteLecture,updateLecture,selectLecture,insertLecture,
} = require("../controllers/curriculumController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/courses", verifyToken, getCourses);
router.post("/courses", verifyToken, insertCourse);
router.put("/courses/update", verifyToken, deleteCourses);
router.put("/courses", verifyToken, updateCourses);
router.get("/section", selectSection);
router.post("/section", insertSection);
router.put("/section/update", deleteSection);
router.put("/section", updateSection);

module.exports = router;
