const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getProgress,
  addProgress,
} = require("../controllers/progressController");

router.get("/",  getProgress);
router.post("/",  addProgress);

module.exports = router;
