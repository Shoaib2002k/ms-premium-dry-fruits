// ===== Server.js — MS DryFruit Backend =====

const express    = require("express");
const cors       = require("cors");
const dotenv     = require("dotenv");

dotenv.config();   // ← must be first, before any other require

const db             = require("./config/db");
const authRoutes     = require("./routes/authRoutes");
const productRoutes  = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes     = require("./routes/cartRoutes");

const app = express();

// ---- Middleware ----
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://welcometomsdryfruit.netlify.app"
  ],
  credentials: true
}));
app.use(express.json());

// ---- Test Database Connection ----
db.query("SELECT 1")
  .then(() => console.log("✅ MySQL connected successfully"))
  .catch((err) => console.log("❌ MySQL connection failed:", err.message));

// ---- Routes ----
app.use("/api/auth",       authRoutes);
app.use("/api/products",   productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart",       cartRoutes);

// ---- Test Route ----
app.get("/", (req, res) => {
  res.json({
    message: "MS DryFruit API is running",
    version: "1.0.0"
  });
});

// ---- Start Server ----
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});