// server.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Use the cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(cors());

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
