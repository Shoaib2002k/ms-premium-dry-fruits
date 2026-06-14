// ===== src/pages/Home.jsx =====

import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.badge}>🌿 100% Natural & Premium</span>
          <h1 style={styles.heroTitle}>
            MS Premium <br />
            <span style={styles.highlight}>Dry Fruits</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Hand-picked, fresh and healthy dry fruits delivered straight to your door.
            Taste the difference of quality.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} onClick={() => navigate("/products")}>
              🛍️ Shop Now
            </button>
            <button style={styles.btnSecondary} onClick={() => navigate("/register")}>
              Join Us Free
            </button>
          </div>
        </div>

        <div style={styles.heroImage}>
          <img src={hero} alt="Premium Dry Fruits" style={styles.img} />
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        {[
          { icon: "🌿", title: "100% Natural",    desc: "No preservatives, no additives. Pure natural goodness." },
          { icon: "🚚", title: "Fast Delivery",   desc: "Fresh delivery to your doorstep within 2-3 days." },
          { icon: "💎", title: "Premium Quality", desc: "Hand-picked and quality checked for your satisfaction." },
          { icon: "💰", title: "Best Prices",     desc: "Competitive prices with no compromise on quality." }
        ].map((f, i) => (
          <div key={i} style={styles.featureCard}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to taste premium quality?</h2>
        <p style={styles.ctaDesc}>Join thousands of happy customers who trust MS DryFruit</p>
        <button style={styles.btnPrimary} onClick={() => navigate("/products")}>
          Explore Products →
        </button>
      </div>

    </div>
  );
}

const styles = {
  page: { background: "#f0ebe3", minHeight: "100vh" },

  hero: {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    padding:        "60px 80px",
    background:     "linear-gradient(135deg, #3d1a00 0%, #8B4513 50%, #c4620a 100%)",
    minHeight:      "85vh",
    flexWrap:       "wrap",
    gap:            "40px"
  },
  heroContent: { flex: 1, minWidth: "280px" },
  badge: {
    background:    "rgba(255,255,255,0.2)",
    color:         "white",
    padding:       "6px 16px",
    borderRadius:  "99px",
    fontSize:      "13px",
    display:       "inline-block",
    marginBottom:  "20px",
    backdropFilter:"blur(10px)"
  },
  heroTitle: {
    fontSize:      "52px",
    fontWeight:    "800",
    color:         "white",
    lineHeight:    "1.2",
    marginBottom:  "20px",
    textShadow:    "2px 4px 8px rgba(0,0,0,0.3)"
  },
  highlight: {
    color:         "#FFD700",
    textShadow:    "0 0 20px rgba(255,215,0,0.5)"
  },
  heroSubtitle: {
    fontSize:      "17px",
    color:         "rgba(255,255,255,0.85)",
    lineHeight:    "1.6",
    marginBottom:  "36px",
    maxWidth:      "480px"
  },
  heroBtns:     { display: "flex", gap: "16px", flexWrap: "wrap" },
  btnPrimary: {
    padding:       "14px 32px",
    background:    "linear-gradient(135deg, #FFD700, #FFA500)",
    color:         "#3d1a00",
    border:        "none",
    borderRadius:  "8px",
    fontSize:      "16px",
    fontWeight:    "700",
    cursor:        "pointer",
    boxShadow:     "0 4px 15px rgba(255,165,0,0.4)"
  },
  btnSecondary: {
    padding:       "14px 32px",
    background:    "rgba(255,255,255,0.15)",
    color:         "white",
    border:        "2px solid rgba(255,255,255,0.5)",
    borderRadius:  "8px",
    fontSize:      "16px",
    fontWeight:    "600",
    cursor:        "pointer",
    backdropFilter:"blur(10px)"
  },
  heroImage: {
    flex:          1,
    minWidth:      "280px",
    display:       "flex",
    justifyContent:"center",
    alignItems:    "center"
  },
  img: {
    width:         "100%",
    maxWidth:      "500px",
    borderRadius:  "20px",
    boxShadow:     "0 20px 60px rgba(0,0,0,0.5)",
    transform:     "perspective(1000px) rotateY(-5deg)",
    border:        "3px solid rgba(255,255,255,0.2)"
  },

  features: {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap:                 "24px",
    padding:             "60px 80px",
    background:          "white"
  },
  featureCard: {
    padding:       "28px 24px",
    background:    "linear-gradient(135deg, #fff9f5, #fff)",
    borderRadius:  "12px",
    boxShadow:     "0 4px 20px rgba(139,69,19,0.1)",
    border:        "1px solid rgba(139,69,19,0.1)",
    textAlign:     "center"
  },
  featureIcon:  { fontSize: "36px", marginBottom: "12px" },
  featureTitle: { color: "#8B4513", fontSize: "17px", fontWeight: "700", marginBottom: "8px" },
  featureDesc:  { color: "#888", fontSize: "13px", lineHeight: "1.5" },

  cta: {
    textAlign:  "center",
    padding:    "80px 24px",
    background: "linear-gradient(135deg, #3d1a00, #8B4513)"
  },
  ctaTitle: { color: "white", fontSize: "32px", marginBottom: "12px", fontWeight: "700" },
  ctaDesc:  { color: "rgba(255,255,255,0.8)", fontSize: "16px", marginBottom: "32px" }
};

export default Home;