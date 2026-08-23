"use client"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [loginHovered, setLoginHovered] = useState(false)

  const links = [
    { name: "Market", href: "/market" },
    { name: "News", href: "/news" },
    { name: "AI Assistant", href: "/ai" },
    { name: "Dashboard", href: "/dashboard" },
  ]

  return (
    <nav style={{
      background: "rgba(5,10,20,0.9)",
      borderBottom: "1px solid rgba(0,255,136,0.1)",
      padding: "20px 52px",
      position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <a href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ color: "white", fontSize: "30px" }}>
            Fyn<span style={{ color: "#00ff88" }}>tric</span>
          </h1>
        </a>

        <div style={{
          display: "flex", gap: "20px", alignItems: "center",
          position: "absolute", left: "50%", transform: "translateX(-50%)",
        }} className="desktop-links">
          {links.map((link) => (
            <a key={link.name} href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                color: hoveredLink === link.name ? "white" : "#94a3b8",
                textDecoration: "none", fontSize: "16px",
                position: "relative", paddingBottom: "4px", transition: "color 0.2s",
              }}>
              {link.name}
              <span style={{
                position: "absolute", bottom: 0, left: 0,
                width: hoveredLink === link.name ? "100%" : "0%",
                height: "2px", background: "#00ff88",
                transition: "width 0.25s", borderRadius: "2px", display: "block",
              }}/>
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => window.location.href = "/login"}
            onMouseEnter={() => setLoginHovered(true)}
            onMouseLeave={() => setLoginHovered(false)}
            style={{
              background: loginHovered ? "#00ff88" : "transparent",
              color: loginHovered ? "#050a14" : "white",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "8px 20px", borderRadius: "8px",
              fontWeight: "600", cursor: "pointer", fontSize: "14px",
              transform: loginHovered ? "scale(1.05)" : "scale(1)",
              transition: "all 0.2s",
            }}
            className="desktop-links"
          >Login</button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white", fontSize: "22px",
              cursor: "pointer", borderRadius: "8px",
              padding: "4px 10px", display: "none",
            }}
            className="hamburger"
          >{isOpen ? "✕" : "☰"}</button>
        </div>
      </div>

      {isOpen && (
        <div style={{
          display: "flex", flexDirection: "column",
          gap: "16px", paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          marginTop: "16px",
        }}>
          {links.map((link) => (
            <a key={link.name} href={link.href} style={{ color: "#94a3b8", textDecoration: "none", fontSize: "18px" }}>{link.name}</a>
          ))}
          <button
            onClick={() => window.location.href = "/login"}
            style={{
              background: "#00ff88", color: "#050a14", border: "none",
              padding: "10px", borderRadius: "8px", fontWeight: "600",
              cursor: "pointer", width: "100%",
            }}
          >Login</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}