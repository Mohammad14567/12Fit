const express = require("express");
const router = express.Router();

const {
  getUsersWithPlans,
  deleteUser,
  countUsers,
  getOnlineUsers,
  updateUserRole,
  checkDbStatus,
  getUptime,
  getDbPing,
} = require("../controllers/userController");

router.get("/with-plans", getUsersWithPlans);
router.get("/count", countUsers);
router.get("/online", getOnlineUsers);
router.get("/db-status", checkDbStatus);
router.get("/uptime", getUptime);
router.get("/db-ping", getDbPing);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUserRole);

module.exports = router;
