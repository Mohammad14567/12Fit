const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getDietPlans,
  createDietPlan,
} = require("../controllers/dietController");

router.get("/", authMiddleware, getDietPlans);
router.post("/", authMiddleware, createDietPlan);

module.exports = router;