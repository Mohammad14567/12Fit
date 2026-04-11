const db = require("../config/db");

const getUsersWithPlans = (req, res) => {
  const sql = "SELECT id, name, email, role FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send();
  });
};

const countUsers = (req, res) => {
  const sql = "SELECT COUNT(*) AS total FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ total: results[0].total });
  });
};

const getOnlineUsers = (req, res) => {
  const count = req.app.get("onlineUsers") || 0;
  res.json({ online: count });
};

const updateUserRole = (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  const sql = "UPDATE users SET role = ? WHERE id = ?";
  db.query(sql, [role, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User role updated successfully" });
  });
};

const checkDbStatus = (req, res) => {
  const sql = "SELECT 1 as test";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database connection failed" });
    }

    res.json({ status: "Database is connected and queries are working" });
  });
};

const getUptime = (req, res) => {
  const uptime = process.uptime(); // in seconds
  res.json({ uptime: Math.floor(uptime) }); // in seconds
};

const getDbPing = (req, res) => {
  const start = Date.now();
  const sql = "SELECT 1";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database ping failed" });
    }
    const end = Date.now();
    const pingTime = end - start;
    res.json({ dbPingTime: pingTime });
  });
};

module.exports = {
  getUsersWithPlans,
  deleteUser,
  countUsers,
  getOnlineUsers,
  updateUserRole,
  checkDbStatus,
  getUptime,
  getDbPing,
};
