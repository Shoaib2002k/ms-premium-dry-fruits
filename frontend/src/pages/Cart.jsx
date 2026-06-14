// ===== src/pages/Cart.jsx =====

import { useState, useEffect } from "react";
import { getCart, removeFromCart } from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart]     = useState([]);
  const [total, setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const res = await getCart();
      setCart(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(id) {
    try {
      await removeFromCart(id);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) return <p style={styles.msg}>Loading cart...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={styles.msg}>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.item}>
              <div>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.qty}>Quantity: {item.quantity}</p>
              </div>
              <div style={styles.right}>
                <p style={styles.price}>Rs. {item.price * item.quantity}</p>
                <button
                  style={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={styles.total}>
            Total: Rs. {total}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container:  { padding: "24px", maxWidth: "700px", margin: "0 auto" },
  title:      { color: "#8B4513", marginBottom: "24px" },
  item:       { display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "16px", borderRadius: "8px", marginBottom: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  name:       { color: "#333", marginBottom: "4px" },
  qty:        { color: "#666", fontSize: "13px" },
  right:      { textAlign: "right" },
  price:      { color: "#8B4513", fontWeight: "bold", marginBottom: "8px" },
  removeBtn:  { background: "#dc3545", color: "white", border: "none", padding: "4px 12px", borderRadius: "4px", cursor: "pointer" },
  total:      { textAlign: "right", fontSize: "20px", fontWeight: "bold", color: "#8B4513", marginTop: "16px" },
  msg:        { textAlign: "center", padding: "40px", color: "#666" }
};

export default Cart;