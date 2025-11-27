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
  "https://employee-frontend-e4wd.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174"
];

// CORS CONFIGURATION
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, etc)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS BLOCKED - Origin:", origin);
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
    message: "Employee Task Management API - Backend Running",
    environment: process.env.NODE_ENV,
    endpoints: {
      employees: "/api/employees",
      tasks: "/api/tasks",
    },
  });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Allowed Origins:", allowedOrigins);
});
