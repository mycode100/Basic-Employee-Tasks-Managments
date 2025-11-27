require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize app
const app = express();

// -------------------------------------------
// CONNECT TO MONGODB
// -------------------------------------------
connectDB().catch((err) => {
  console.error("❌ Failed to connect to MongoDB on startup:", err.message);
});

// -------------------------------------------
// MIDDLEWARE
// -------------------------------------------

// Allow frontend + Railway/live domains
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "https://localhost:5173"
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// -------------------------------------------
// ROUTES
// -------------------------------------------
app.use('/api/employees', require('./routes/employees'));
app.use('/api/tasks', require('./routes/tasks'));

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Employee Task Management API is running',
    endpoints: {
      employees: '/api/employees',
      tasks: '/api/tasks',
    },
  });
});

// -------------------------------------------
// SERVER
// -------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend Allowed: ${process.env.FRONTEND_URL}`);
});
