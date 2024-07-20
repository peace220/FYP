const express = require("express");
const {
  getCourses,insertCourse,updateCourses,deleteCourses,getPublicCourses,  enrollCourse, getSelectedCourseDetails,
  insertSection,updateSection,deleteSection,selectSection,
  deleteLecture,updateLecture,selectItems,insertLecture,
  insertQuiz,
  uploadVideo,upload,
  getVideos,

} = require("../controllers/curriculumController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/courses", verifyToken, getCourses);
router.get("/publicCourses", getPublicCourses);
router.get("/courses/:courseId", getSelectedCourseDetails);
router.get("/section", selectSection);
router.get("/items", selectItems);
router.get("/videos", getVideos);

router.post("/courses", verifyToken, insertCourse);
router.post("/section", insertSection);
router.post("/lecture", insertLecture);
router.post("/quiz", insertQuiz);
router.post("/uploadVideo", upload.single("video"), uploadVideo);
router.post("/enroll", verifyToken, enrollCourse);

router.put("/courses/update", verifyToken, deleteCourses);
router.put("/courses", verifyToken, updateCourses);
router.put("/section/update", deleteSection);
router.put("/section", updateSection);
router.put("/lecture/update", deleteLecture);
router.put("/lecture", updateLecture);


module.exports = router;
