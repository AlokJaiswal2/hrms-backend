const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

const app = express();

/**
 * ✅ CORS — stable & simple
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Debug log
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

// routes
app.use("/api/employees", require("./routes/employees"));
app.use("/api/attendance", require("./routes/attendance"));

// test route
app.get("/", (req, res) => {
  res.send("HRMS Lite API running");
});

const PORT = process.env.PORT || 5001;

/**
 * ✅ Proper async startup
 */
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database error:", error);
  }
})();
