const express = require("express");
const {
  selectCourse,
  getCourses,
  enrollCourse,
  getSelectedCourseDetails,
  getEnrolledCourses,
  getPublicCourses,
  getSelectedCoruseSections,
  checkEnrollmentStatus,
} = require("../controllers/courseController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/select", verifyToken, selectCourse);
router.get("/courses", verifyToken, getCourses);
router.get("/publicCourses", verifyToken, getPublicCourses);
router.post("/enroll", verifyToken, enrollCourse);
router.get("/enrolledCourse", verifyToken, getEnrolledCourses);
router.get("/courses/:courseId", getSelectedCourseDetails);
router.get("/courses/:courseId/sections", getSelectedCoruseSections);
router.get("/checkEnrollmentStatus/:courseId", verifyToken, checkEnrollmentStatus);
module.exports = router;
