const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getWorkouts,
  createWorkout,
} = require("../controllers/workoutController");

router.get("/",  getWorkouts);
router.post("/",  createWorkout);

module.exports = router;
