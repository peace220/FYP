const express = require("express");
const {
  getCourses,insertCourse,updateCourses,deleteCourses,getSelectedCourses, publishCourse,
  insertSection,updateSection,deleteSection,selectSection,
  deleteLecture,updateLecture,selectItems,insertLecture,
  insertQuiz, updateQuiz, deleteQuiz,
  uploadVideo,upload,
  getVideos,
  insertQuestions, getQuestions, updateQuestions,
  updateVideo,

} = require("../controllers/curriculumController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/courses", verifyToken, getCourses);
router.get("/courses/:courseId", verifyToken, getSelectedCourses);
router.get("/section", selectSection);
router.get("/items", selectItems);
router.get("/videos", getVideos);
router.get("/questions", getQuestions);

router.post("/courses", verifyToken, insertCourse);
router.post("/section", insertSection);
router.post("/lecture", insertLecture);
router.post("/questions", insertQuestions);
router.post("/quiz", insertQuiz);
router.post("/uploadVideo", upload, uploadVideo);


router.put("/courses/update", verifyToken, deleteCourses);
router.put("/courses", verifyToken, updateCourses);
router.put("/section/update", deleteSection);
router.put("/section", updateSection);
router.put("/lecture/update", deleteLecture);
router.put("/lecture", updateLecture);
router.put("/quiz", updateQuiz);
router.put("/quiz/update", deleteQuiz);
router.put("/question", updateQuestions);
router.put("/publish", publishCourse);
router.put("/uploadVideo", upload, updateVideo)


module.exports = router;
