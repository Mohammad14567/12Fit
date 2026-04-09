const express = require("express");
const router = express.Router();


const {
  getProgress,
  addProgress,
} = require("../controllers/progressController");

router.get("/",  getProgress);
router.post("/", addProgress);

module.exports = router;
