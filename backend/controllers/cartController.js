// ===== controllers/cartController.js =====

const db = require("../config/db");

// GET /api/cart — get user cart
const getCart = async (req, res) => {
  try {
    const [items] = await db.query(
      `SELECT cart.id, cart.quantity, cart.added_at,
              products.id as product_id, products.name,
              products.price, products.image_url
       FROM cart
       JOIN products ON cart.product_id = products.id
       WHERE cart.user_id = ?`,
      [req.user.id]
    );

    const total = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    res.json({
      success: true,
      count:   items.length,
      total:   total.toFixed(2),
      data:    items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// POST /api/cart — add item to cart
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    // Check if product exists
    const [product] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [product_id]
    );

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Check if already in cart
    const [existing] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [req.user.id, product_id]
    );

    if (existing.length > 0) {
      // Update quantity
      await db.query(
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
        [quantity || 1, req.user.id, product_id]
      );
    } else {
      // Add new item
      await db.query(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [req.user.id, product_id, quantity || 1]
      );
    }

    res.status(201).json({
      success: true,
      message: "Item added to cart"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// PUT /api/cart/:id — update quantity
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required"
      });
    }

    await db.query(
      "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?",
      [quantity, req.params.id, req.user.id]
    );

    res.json({
      success: true,
      message: "Cart updated"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE /api/cart/:id — remove item
const removeFromCart = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM cart WHERE id = ? AND user_id = ?",
      [req.params.id, req.user.id]
    );

    res.json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE /api/cart — clear entire cart
const clearCart = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM cart WHERE user_id = ?",
      [req.user.id]
    );

    res.json({
      success: true,
      message: "Cart cleared"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getCart, addToCart, updateCart, removeFromCart, clearCart };