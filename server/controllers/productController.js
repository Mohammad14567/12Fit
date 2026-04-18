const db = require("../config/db");

const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

const createProduct = (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO products (name, price, category) VALUES (?, ?, ?)";
  db.query(sql, [name, price, category], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Insert error" });
    }

    res.status(201).json({ message: "Product created successfully" });
  });
};

module.exports = {
  getProducts,
  createProduct,
};