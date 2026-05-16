const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// Uploads a product image to Cloudinary using the memory buffer from multer.
// Returns the Cloudinary upload result, including the secure image URL.
const uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "12fit/products",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(fileBuffer);
  });
};
// Gets all products from MongoDB.
// If a search query is provided, products are filtered by product name.
const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.log("Get products error:", error.message);
    res.status(500).json({ message: "Database error" });
  }
};

// Creates a new product.
// If an image file is sent, it is uploaded to Cloudinary first.
// Then the product data and image URL are stored in MongoDB.
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      shortDesc,
      category,
      description,
      usageTips,
      benefits,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    let imageUrl = "";

    if (req.file) {
      const uploadedImage = await uploadImageToCloudinary(req.file.buffer);
      imageUrl = uploadedImage.secure_url;
    }

    let benefitsArray = [];

    if (Array.isArray(benefits)) {
      benefitsArray = benefits;
    } else if (typeof benefits === "string") {
      benefitsArray = benefits
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    const product = await Product.create({
      name,
      price,
      image: imageUrl,
      shortDesc,
      category,
      description,
      usageTips,
      benefits: benefitsArray,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("Create product error:", error.message);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Updates an existing product by id.
// If a new image is uploaded, the new Cloudinary URL replaces the old image URL.
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      shortDesc,
      category,
      description,
      usageTips,
      benefits,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    const oldProduct = await Product.findById(req.params.id);

    if (!oldProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let imageUrl = oldProduct.image;

    if (req.file) {
      const uploadedImage = await uploadImageToCloudinary(req.file.buffer);
      imageUrl = uploadedImage.secure_url;
    }

    let benefitsArray = [];

    if (Array.isArray(benefits)) {
      benefitsArray = benefits;
    } else if (typeof benefits === "string") {
      benefitsArray = benefits
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        image: imageUrl,
        shortDesc,
        category,
        description,
        usageTips,
        benefits: benefitsArray,
      },
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("Update product error:", error.message);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Deletes a product from MongoDB by id.
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Delete product error:", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};