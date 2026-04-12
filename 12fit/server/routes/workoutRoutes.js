const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getWorkouts,
  createWorkout,
  generateWorkout,
} = require("../controllers/workoutController");

router.get("/", authMiddleware, getWorkouts);
router.post("/", authMiddleware, createWorkout);
router.post("/generate", authMiddleware, generateWorkout);

module.exports = router;