// ===== src/pages/Products.jsx =====

import { useState, useEffect } from "react";
import { getProducts, addToCart } from "../services/api";
import { useNavigate } from "react-router-dom";

// Import images
import almonds     from "../assets/almond.jpg";
import cashews     from "../assets/cashews.jpg";
import walnuts     from "../assets/walnuts.jpg";
import raisins     from "../assets/raisins.jpg";
import dates       from "../assets/dates.jpg";
import cranberries from "../assets/cranberries.jpg";
import pumpkin     from "../assets/pumpkin.jpg";
import flax        from "../assets/flax.jpg";

const imageMap = {
  "almonds.jpg":     almonds,
  "cashews.jpg":     cashews,
  "walnuts.jpg":     walnuts,
  "raisins.jpg":     raisins,
  "dates.jpg":       dates,
  "cranberries.jpg": cranberries,
  "pumpkin.jpg":     pumpkin,
  "flax.jpg":        flax
};

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [message, setMessage]   = useState("");

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  async function handleAddToCart(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await addToCart({ product_id: productId, quantity: 1 });
      setMessage("Item added to cart!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Failed to add to cart");
    }
  }

  if (loading) return <p style={styles.msg}>Loading products...</p>;
  if (error)   return <p style={styles.msg}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Products</h1>

      {message && <div style={styles.toast}>{message}</div>}

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={imageMap[product.image_url] || almonds}
              alt={product.name}
              style={styles.image}
            />
            <div style={styles.body}>
              <h3 style={styles.name}>{product.name}</h3>
              <p style={styles.desc}>{product.description}</p>
              <p style={styles.price}>Rs. {product.price}</p>
              <p style={styles.stock}>Stock: {product.stock} units</p>
              <button
                style={styles.btn}
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding:       "24px",
    maxWidth:      "1100px",
    margin:        "0 auto"
  },
  title: {
    color:         "#8B4513",
    marginBottom:  "24px",
    textAlign:     "center",
    fontSize:      "32px"
  },
  grid: {
    display:               "grid",
    gridTemplateColumns:   "repeat(auto-fill, minmax(280px, 1fr))",
    gap:                   "24px"
  },
  card: {
    background:    "white",
    borderRadius:  "10px",
    boxShadow:     "0 2px 8px rgba(0,0,0,0.1)",
    overflow:      "hidden",
    transition:    "transform 0.2s",
  },
  image: {
    width:         "100%",
    height:        "200px",
    objectFit:     "cover"
  },
  body: {
    padding:       "16px"
  },
  name: {
    color:         "#333",
    marginBottom:  "8px",
    fontSize:      "18px"
  },
  desc: {
    color:         "#666",
    fontSize:      "13px",
    marginBottom:  "12px",
    lineHeight:    "1.4"
  },
  price: {
    color:         "#8B4513",
    fontWeight:    "bold",
    fontSize:      "18px",
    marginBottom:  "4px"
  },
  stock: {
    color:         "#999",
    fontSize:      "12px",
    marginBottom:  "16px"
  },
  btn: {
    background:    "#8B4513",
    color:         "white",
    border:        "none",
    padding:       "10px 16px",
    borderRadius:  "6px",
    cursor:        "pointer",
    width:         "100%",
    fontSize:      "14px",
    fontWeight:    "500"
  },
  toast: {
    background:    "#4CAF50",
    color:         "white",
    padding:       "12px 24px",
    borderRadius:  "6px",
    marginBottom:  "16px",
    textAlign:     "center",
    fontSize:      "14px"
  },
  msg: {
    textAlign:     "center",
    padding:       "40px",
    color:         "#666"
  }
};

export default Products;