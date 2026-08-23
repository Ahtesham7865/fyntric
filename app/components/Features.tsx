"use client"
import { useState } from "react"

const features = [
  { icon: "🤖", title: "AI Finance Teacher", desc: "Ask any finance question in plain language. Get clear beginner-friendly answers with real market context." },
  { icon: "📈", title: "Real-Time Charts", desc: "Professional candlestick and line charts with live price data, volume, and technical indicators." },
  { icon: "💼", title: "Paper Trading Simulator", desc: "Practice buying and selling with virtual funds. Build confidence before risking real money." },
  { icon: "📰", title: "AI News Summary", desc: "Financial news from top sources, summarized by AI so you always stay informed fast." },
  { icon: "📊", title: "Portfolio Analytics", desc: "Track P&L, sector allocation, risk metrics, and performance against benchmarks in real-time." },
  { icon: "🌍", title: "Market Intelligence", desc: "Global market overview — indices, commodities, crypto, and forex updated in real-time." },
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
          PLATFORM FEATURES
        </p>
      </div>
      <h2 style={{ color: "white", fontSize: "32px", fontWeight: "700", marginBottom: "40px" }}>
        Everything You Need to Invest Smarter
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(440px, 2fr))",
        gap: "16px",
      }}>
        {features.map((f, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: hoveredIndex === i ? "rgba(0,255,136,0.03)" : "rgba(255,255,255,0.025)",
              border: hoveredIndex === i ? "1px solid rgba(0,255,136,0.25)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              padding: "22px",
              transform: hoveredIndex === i ? "translateY(-2px)" : "translateY(0px)",
              transition: "all 0.25s",
              cursor: "default",
            }}
          >
            <div style={{
              width: "40px", height: "40px",
              borderRadius: "10px",
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "30px", marginBottom: "14px",
            }}>{f.icon}</div>
            <h3 style={{ color: "#e2e8f0", fontSize: "18px", fontWeight: "600", marginBottom: "7px" }}>{f.title}</h3>
            <p style={{ color: "#475569", fontSize: "16px", lineHeight: "1.6" }}>{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}