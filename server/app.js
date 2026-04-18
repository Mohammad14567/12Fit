const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const dietRoutes = require("./routes/dietRoutes");
const productRoutes = require("./routes/productRoutes");
const progressRoutes = require("./routes/progressRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();




app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://fit12-pro.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("12Fit API is running");
});

app.use("/auth", authRoutes);
app.use("/workouts", workoutRoutes);
app.use("/diet", dietRoutes);
app.use("/products", productRoutes);
app.use("/progress", progressRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://fit12-pro.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = 0;
app.set("onlineUsers", onlineUsers);

io.on("connection", (socket) => {
  onlineUsers += 1;
  app.set("onlineUsers", onlineUsers);
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers = Math.max(0, onlineUsers - 1);
    app.set("onlineUsers", onlineUsers);
    io.emit("onlineUsers", onlineUsers);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});