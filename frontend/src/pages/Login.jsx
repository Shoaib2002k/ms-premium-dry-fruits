// ===== src/pages/Login.jsx =====

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const navigate              = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Left side */}
        <div style={styles.left}>
          <h2 style={styles.leftTitle}>🌰 MS DryFruit</h2>
          <p style={styles.leftText}>Premium quality dry fruits for a healthier lifestyle</p>
          <div style={styles.dots}>
            <span style={styles.dot1}></span>
            <span style={styles.dot2}></span>
            <span style={styles.dot3}></span>
          </div>
        </div>

        {/* Right side */}
        <div style={styles.right}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to your account</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button style={styles.btn} disabled={loading}>
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <p style={styles.link}>
            Don't have an account? <Link to="/register" style={styles.linkA}>Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight:      "100vh",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    background:     "linear-gradient(135deg, #f0ebe3, #e8ddd0)",
    padding:        "24px"
  },
  card: {
    display:       "flex",
    borderRadius:  "20px",
    overflow:      "hidden",
    boxShadow:     "0 20px 60px rgba(0,0,0,0.15)",
    maxWidth:      "800px",
    width:         "100%"
  },
  left: {
    flex:          1,
    background:    "linear-gradient(135deg, #3d1a00, #8B4513)",
    padding:       "60px 40px",
    display:       "flex",
    flexDirection: "column",
    justifyContent:"center",
    minWidth:      "240px"
  },
  leftTitle: { color: "#FFD700", fontSize: "28px", marginBottom: "16px" },
  leftText:  { color: "rgba(255,255,255,0.8)", fontSize: "15px", lineHeight: "1.6" },
  dots:      { display: "flex", gap: "8px", marginTop: "32px" },
  dot1:      { width: "12px", height: "12px", borderRadius: "50%", background: "#FFD700" },
  dot2:      { width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255,255,255,0.5)" },
  dot3:      { width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" },
  right: {
    flex:          1.2,
    background:    "white",
    padding:       "60px 40px"
  },
  title:    { color: "#3d1a00", fontSize: "28px", fontWeight: "700", marginBottom: "8px" },
  subtitle: { color: "#888", fontSize: "14px", marginBottom: "32px" },
  field:    { marginBottom: "20px" },
  label:    { display: "block", color: "#555", fontSize: "13px", fontWeight: "600", marginBottom: "6px" },
  input: {
    width:         "100%",
    padding:       "12px 16px",
    border:        "2px solid #e8ddd0",
    borderRadius:  "8px",
    fontSize:      "14px",
    outline:       "none",
    transition:    "border 0.2s",
    boxSizing:     "border-box"
  },
  btn: {
    width:         "100%",
    padding:       "14px",
    background:    "linear-gradient(135deg, #8B4513, #c4620a)",
    color:         "white",
    border:        "none",
    borderRadius:  "8px",
    fontSize:      "16px",
    fontWeight:    "700",
    cursor:        "pointer",
    marginTop:     "8px",
    boxShadow:     "0 4px 15px rgba(139,69,19,0.3)"
  },
  error: {
    background:    "#fff0f0",
    color:         "#dc3545",
    padding:       "12px 16px",
    borderRadius:  "8px",
    marginBottom:  "20px",
    fontSize:      "14px",
    border:        "1px solid #ffcccc"
  },
  link:  { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#888" },
  linkA: { color: "#8B4513", fontWeight: "600" }
};

export default Login;