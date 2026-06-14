// ===== routes/productRoutes.js =====

const express = require("express");
const router  = express.Router();
const db      = require("../config/db");

// GET /api/products — get all products from MySQL
router.get("/", async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.json({
      success: true,
      count:   products.length,
      data:    products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/products/:id — get single product
router.get("/:id", async (req, res) => {
  try {
    const [product] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data:    product[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/products/category/:categoryId — get products by category
router.get("/category/:categoryId", async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products WHERE category_id = ?",
      [req.params.categoryId]
    );

    res.json({
      success: true,
      count:   products.length,
      data:    products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;