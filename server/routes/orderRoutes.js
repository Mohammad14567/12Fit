const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// Public route , Users can create orders from checkout.
router.post("/", createOrder);

// Admin routes ,Only authenticated admins can view, update, or delete orders.
router.get("/", authMiddleware, adminMiddleware, getOrders);

router.get("/:id", authMiddleware, adminMiddleware, getOrderById);

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);

module.exports = router;