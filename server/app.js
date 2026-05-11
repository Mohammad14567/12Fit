const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const dietRoutes = require("./routes/dietRoutes");
const productRoutes = require("./routes/productRoutes");
const progressRoutes = require("./routes/progressRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("12Fit API is running");
});

app.get("/cors-test", (req, res) => {
  res.json({
    message: "CORS is working",
  });
});

app.use("/auth", authRoutes);
app.use("/workouts", workoutRoutes);
app.use("/diet", dietRoutes);
app.use("/products", productRoutes);
app.use("/progress", progressRoutes);
app.use("/users", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

let onlineUsers = 0;

app.set("onlineUsers", onlineUsers);

io.on("connection", (socket) => {
  onlineUsers += 1;

  app.set("onlineUsers", onlineUsers);

  io.emit("onlineUsers", onlineUsers);
  io.emit("online-users-count", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers = Math.max(0, onlineUsers - 1);

    app.set("onlineUsers", onlineUsers);

    io.emit("onlineUsers", onlineUsers);
    io.emit("online-users-count", onlineUsers);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
