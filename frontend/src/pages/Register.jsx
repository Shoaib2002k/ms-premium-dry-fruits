// ===== src/pages/Register.jsx =====

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const navigate              = useNavigate();
  const [form, setForm]       = useState({ name: "", email: "", password: "", phone: "", address: "" });
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
      const res = await registerUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join MS DryFruit family today</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name *</label>
              <input style={styles.input} type="text"     name="name"     placeholder="Shoaib"           value={form.name}     onChange={handleChange} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email *</label>
              <input style={styles.input} type="email"    name="email"    placeholder="shoaib@gmail.com" value={form.email}    onChange={handleChange} required />
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Password *</label>
              <input style={styles.input} type="password" name="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Phone</label>
              <input style={styles.input} type="text"     name="phone"    placeholder="9876543210"       value={form.phone}    onChange={handleChange} />
            </div>
          </div>
          <div style={styles.fieldFull}>
            <label style={styles.label}>Address</label>
            <input style={styles.input} type="text" name="address" placeholder="Your city, state" value={form.address} onChange={handleChange} />
          </div>

          <button style={styles.btn} disabled={loading}>
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <p style={styles.link}>
          Already have account? <Link to="/login" style={styles.linkA}>Login here</Link>
        </p>
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
    background:     "linear-gradient(135deg, #3d1a00, #8B4513)",
    padding:        "24px"
  },
  card: {
    background:    "white",
    borderRadius:  "20px",
    padding:       "48px",
    maxWidth:      "680px",
    width:         "100%",
    boxShadow:     "0 20px 60px rgba(0,0,0,0.3)"
  },
  header:   { textAlign: "center", marginBottom: "32px" },
  title:    { color: "#3d1a00", fontSize: "28px", fontWeight: "700", marginBottom: "8px" },
  subtitle: { color: "#888", fontSize: "14px" },
  form:     {},
  row:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" },
  field:    {},
  fieldFull:{ marginBottom: "20px" },
  label:    { display: "block", color: "#555", fontSize: "13px", fontWeight: "600", marginBottom: "6px" },
  input: {
    width:         "100%",
    padding:       "12px 16px",
    border:        "2px solid #e8ddd0",
    borderRadius:  "8px",
    fontSize:      "14px",
    outline:       "none",
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

export default Register;