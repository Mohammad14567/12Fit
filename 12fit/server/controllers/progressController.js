const db = require("../config/db");

const getProgress = (req, res) => {
  const userId = 1;
  const sql = "SELECT day_name, weight FROM progress WHERE user_id = ? ORDER BY id ASC";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

const addProgress = (req, res) => {
  const userId = 1;
  const { day_name, weight } = req.body;
  const dayName = day_name || new Date().toLocaleDateString("en-US");

  if (!weight) {
    return res.status(400).json({ message: "Weight is required" });
  }

  const sql = "INSERT INTO progress (user_id, day_name, weight) VALUES (?, ?, ?)";
  db.query(sql, [userId, dayName, weight], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Insert error" });
    }

    res.status(201).json({ message: "Progress added successfully" });
  });
};

module.exports = {
  getProgress,
  addProgress,
};
