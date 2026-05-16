const Order = require("../models/Order");

// Creates a new customer order and stores it in MongoDB.
// The order contains customer information, cart items, payment method,
// total price, and initial order status.
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      notes,
      paymentMethod,
      items,
      totalPrice,
    } = req.body;

    if (!customerName || !phone || !address) {
      return res.status(400).json({
        message: "Customer name, phone, and address are required",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    const order = await Order.create({
      customerName,
      phone,
      address,
      notes: notes || "",
      paymentMethod: paymentMethod || "Cash on Delivery",
      items,
      totalPrice: totalPrice || 0,
      status: "Pending",
    });

    const io = req.app.get("io");

    // Sends a real-time notification to admins when a new order is created.
    // This works only if Socket.IO is available in the Express app.
    if (io) {
      io.emit("newOrder", order);
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("Create order error:", error.message);

    res.status(500).json({
      message: "Order creation failed",
    });
  }
};

// Gets all orders from MongoDB.
// This endpoint is intended for admin use only.
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.log("Get orders error:", error.message);

    res.status(500).json({
      message: "Database error",
    });
  }
};

// Gets a specific order by id.
// This helps the admin view the full details of one order.
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.log("Get order error:", error.message);

    res.status(500).json({
      message: "Database error",
    });
  }
};

// Updates the status of an order.
// Allowed statuses are Pending, Processing, Delivered, and Cancelled.
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Processing", "Delivered", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("Update order status error:", error.message);

    res.status(500).json({
      message: "Update failed",
    });
  }
};

// Deletes an order from MongoDB by id.
// This should be used only for test, fake, or incorrect orders.
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("Delete order error:", error.message);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};