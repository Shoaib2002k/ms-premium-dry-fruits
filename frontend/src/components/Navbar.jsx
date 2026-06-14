// ===== src/components/Navbar.jsx =====

import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate  = useNavigate();
  const token     = localStorage.getItem("token");
  const user      = JSON.parse(localStorage.getItem("user") || "{}");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🌰 MS DryFruit</Link>

      <div style={styles.links}>
        <Link to="/"         style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart"     style={styles.link}>🛒 Cart</Link>

        {token ? (
          <>
            <span style={styles.user}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display:         "flex",
    justifyContent:  "space-between",
    alignItems:      "center",
    padding:         "14px 24px",
    background:      "#8B4513",
    color:           "white"
  },
  brand: {
    color:           "white",
    textDecoration:  "none",
    fontSize:        "20px",
    fontWeight:      "bold"
  },
  links: {
    display:         "flex",
    alignItems:      "center",
    gap:             "20px"
  },
  link: {
    color:           "white",
    textDecoration:  "none",
    fontSize:        "14px"
  },
  user: {
    color:           "#f5deb3",
    fontSize:        "14px"
  },
  btn: {
    background:      "white",
    color:           "#8B4513",
    border:          "none",
    padding:         "6px 14px",
    borderRadius:    "4px",
    cursor:          "pointer",
    fontWeight:      "500"
  }
};

export default Navbar;