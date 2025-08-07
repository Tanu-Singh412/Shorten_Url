const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const urlRoutes = require("./routes/urlRoutes");

// Middleware
app.use(express.json());
app.use(cookieParser());

const isVercel = !!process.env.VERCEL;

const allowedOrigins = [
  "http://localhost:5173",
  "https://url-shortener-beta-mocha.vercel.app/",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PATCH,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);

// Ensure DB connection on each request (useful for serverless like Vercel)
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 0) {
    try {
      await connectDB();
    } catch (err) {
      console.error("Database Connection Failed:", err);
      return res.status(500).json({ error: "Database Connection Failed" });
    }
  }
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// URL Shortener routes
app.use("/", urlRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Export for Vercel serverless function
if (isVercel) {
  module.exports = async (req, res) => {
    try {
      if (mongoose.connection.readyState === 0) await connectDB();
      return app(req, res);
    } catch (err) {
      console.error("Vercel API Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
} else if (require.main === module) {
  // Run server locally only if not in a test environment
  connectDB()
    .then(() => {
      console.log("MongoDB Connected Successfully");
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Cannot connect to DB:", err);
      process.exit(1);
    });
}

// Always export app for testing
module.exports = app;
