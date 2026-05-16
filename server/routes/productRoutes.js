const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");
const {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");
// Public route , Users can view all products and search products by name.
router.get("/", getProducts);
// Admin routes ,Only authenticated admins can create, update, or delete products.
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), createProduct);
router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;