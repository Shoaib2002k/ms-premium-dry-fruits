// ===== routes/cartRoutes.js =====

const express    = require("express");
const router     = express.Router();
const { getCart, addToCart, updateCart, removeFromCart, clearCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// All cart routes require login
router.use(protect);

router.get("/",        getCart);
router.post("/",       addToCart);
router.put("/:id",     updateCart);
router.delete("/clear",removeFromCart);
router.delete("/:id",  removeFromCart);

module.exports = router;