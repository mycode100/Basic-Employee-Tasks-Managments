require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// CONNECT MONGODB
connectDB();

// ALLOWED ORIGINS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://basic-employee-tasks-managments-fro.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174"
];

// FIXED CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman, mobile apps

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS BLOCKED → Origin:", origin);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/employees", require("./routes/employees"));
app.use("/api/tasks", require("./routes/tasks"));

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working on Render 🚀",
    endpoints: {
      employees: "/api/employees",
      tasks: "/api/tasks",
    },
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
  console.log("🌍 Allowed Origins:", allowedOrigins);
});
