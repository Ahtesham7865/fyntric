const links = ["About", "Features", "Pricing", "Blog", "Docs", "Privacy", "Terms"]

export default function Footer() {
  return (
    <footer style={{
      padding: "40px 32px 28px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>

      {/* Top Row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "28px",
        flexWrap: "wrap",
        gap: "20px",
      }}>

        <div>
          <h2 style={{ color: "white", fontSize: "30px", fontWeight: "700", marginBottom: "8px" }}>
            Fyn<span style={{ color: "#00ff88" }}>tric</span>
          </h2>
          <p style={{ color: "#334155", fontSize: "12px", maxWidth: "220px", lineHeight: "1.6" }}>
            AI-powered financial learning and paper trading for everyone.
          </p>
        </div>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {links.map((l, i) => (
            <a key={i} href="#" style={{ color: "#475569", fontSize: "12px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>

      </div>

      {/* Bottom Row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "18px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        flexWrap: "wrap",
        gap: "10px",
      }}>
        <p style={{ color: "#334155", fontSize: "12px" }}>© 2025 Fyntric (By-Ahtesham khan). All rights reserved..</p>
        <div style={{ display: "flex", gap: "16px" }}>
          {["Twitter", "GitHub", "LinkedIn", "Discord"].map((s, i) => (
            <a key={i} href="#" style={{ color: "#334155", fontSize: "12px", textDecoration: "none" }}>{s}</a>
          ))}
        </div>
      </div>

    </footer>
  )
}