const express = require("express");
const {
  signup,
  login,
  getUserProfile,
  updatePassword,
  updateUsername,
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", verifyToken, getUserProfile);
router.put("/profileUpdate", verifyToken, updateUsername);
router.put("/changePassword", verifyToken, updatePassword);
module.exports = router;
