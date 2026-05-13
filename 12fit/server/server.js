require('dotenv').config();
const myExpressApp = require("express"); 
const myCorsPlugin = require("cors");
const workoutRoutes = require("./routes/workoutRoutes");

const app = myExpressApp();

app.use(myCorsPlugin({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(myExpressApp.json()); 

app.use("/api/workouts", workoutRoutes); 

app.get("/", (req, res) => {
    res.send(" Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(` Server started on http://localhost:${PORT}`);
});