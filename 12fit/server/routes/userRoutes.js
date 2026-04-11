const express = require("express");
const router = express.Router();

const {
  getUsersWithPlans,
  deleteUser,
  countUsers,
  getOnlineUsers,
} = require("../controllers/userController");

router.get("/with-plans", getUsersWithPlans);
router.get("/count", countUsers);
router.get("/online", getOnlineUsers);
router.delete("/:id", deleteUser);

module.exports = router;
