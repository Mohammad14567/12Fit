const express = require("express");
const router = express.Router();


const {
  getDietPlans,
  createDietPlan,
} = require("../controllers/dietController");

router.get("/",  getDietPlans);
router.post("/",  createDietPlan);

module.exports = router;
