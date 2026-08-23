"use client"
import { useState } from "react"

const cards = [
  { label: "Total Portfolio", value: "$24,831", change: "▲ +4.2% this week", up: true },
  { label: "Daily P&L", value: "-$142", change: "▼ -0.57% today", up: false },
  { label: "Paper Trades", value: "14", change: "8 active positions", up: true },
]

const watchlist = [
  { sym: "TSLA", name: "Tesla Inc.", price: "$248.17", change: "+1.87%", up: true },
  { sym: "META", name: "Meta Platforms", price: "$502.33", change: "-0.44%", up: false },
  { sym: "INFY", name: "Infosys Ltd.", price: "$18.92", change: "+0.62%", up: true },
]

export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
     <div style={{ padding: "64px 32px"}}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#00ff88",
          boxShadow: "0 0 6px #00ff88",
          animation: "pulse 2s infinite",
        }}/>
        <p style={{ color: "#00ff88", fontSize: "20px", letterSpacing: "1.5px" }}>
          DASHBOARD PREVIEW
        </p>
      </div>
      <h2 style={{ color: "white", fontSize: "32px", fontWeight: "700", marginBottom: "10px" }}>
        Your Financial Command Center
      </h2>
      <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "40px" }}>
        Portfolio, watchlists, AI insights and live data — all in one place.
      </p>

      {/* Top 3 Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
        {cards.map((card, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: hoveredCard === i ? "rgba(0,255,136,0.03)" : "rgba(255,255,255,0.03)",
              border: hoveredCard === i ? "1px solid rgba(0,255,136,0.25)" : "1px solid rgba(255,255,255,0.06)",
              transform: hoveredCard === i ? "translateY(-2px)" : "translateY(0px)",
              transition: "all 0.25s",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <p style={{ color: "#475569", fontSize: "12px", marginBottom: "8px" }}>{card.label}</p>
            <p style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{card.value}</p>
            <p style={{ color: card.up ? "#00ff88" : "#f87171", fontSize: "12px", marginTop: "6px" }}>{card.change}</p>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>

        {/* Market Chart */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px",
          padding: "20px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <p style={{ color: "#475569", fontSize: "12px" }}>Market Overview — NVDA</p>
              <p style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>
                $891.33 <span style={{ color: "#00ff88", fontSize: "13px" }}>▲ +3.21%</span>
              </p>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {["1D", "1W", "1M"].map((t, i) => (
                <span key={i} style={{
                  fontSize: "11px", padding: "4px 8px", borderRadius: "6px", cursor: "pointer",
                  background: t === "1W" ? "rgba(0,255,136,0.08)" : "rgba(255,255,255,0.04)",
                  color: t === "1W" ? "#00ff88" : "#475569",
                  border: t === "1W" ? "1px solid rgba(0,255,136,0.15)" : "none",
                }}>{t}</span>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 440 90" fill="none" style={{ width: "100%" }}>
            <defs>
              <linearGradient id="grd2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M 0 70 C 60 58 110 50 160 42 C 210 34 260 48 310 35 C 350 24 400 10 440 5 L 440 90 L 0 90 Z" fill="url(#grd2)"/>
            <path d="M 0 70 C 60 58 110 50 160 42 C 210 34 260 48 310 35 C 350 24 400 10 440 5" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="440" cy="5" r="3" fill="#00ff88"/>
          </svg>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", flexWrap: "wrap", gap: "6px" }}>
            {["Open: $863.20", "High: $897.44", "Low: $858.91", "Vol: 48.2M"].map((s, i) => (
              <span key={i} style={{ fontSize: "11px", color: "#334155" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Watchlist + AI Insight */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "14px",
            padding: "20px",
            flex: 1,
          }}>
            <p style={{ color: "#475569", fontSize: "12px", marginBottom: "12px" }}>👁 Watchlist</p>
            {watchlist.map((s, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                padding: "9px 0",
                borderBottom: i < watchlist.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <div>
                  <p style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "600" }}>{s.sym}</p>
                  <p style={{ color: "#475569", fontSize: "11px" }}>{s.name}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#cbd5e1", fontSize: "13px" }}>{s.price}</p>
                  <p style={{ color: s.up ? "#00ff88" : "#f87171", fontSize: "11px" }}>{s.change}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,120,255,0.15)",
            borderRadius: "14px",
            padding: "20px",
          }}>
            <p style={{ color: "#475569", fontSize: "12px", marginBottom: "10px" }}>✦ AI Insight</p>
            <div style={{
              background: "rgba(0,120,255,0.06)",
              border: "1px solid rgba(0,120,255,0.12)",
              borderRadius: "10px",
              padding: "10px 12px",
            }}>
              <p style={{ color: "#93c5fd", fontSize: "12px", lineHeight: "1.5" }}>
                💡 NVDA shows strong momentum — earnings beat + data center demand are key catalysts this quarter.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}