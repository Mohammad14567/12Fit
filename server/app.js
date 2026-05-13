const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const dietRoutes = require("./routes/dietRoutes");
const productRoutes = require("./routes/productRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("12Fit API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/products", productRoutes);
app.use("/api/progress", progressRoutes);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();