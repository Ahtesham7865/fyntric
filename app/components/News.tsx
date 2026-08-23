"use client"
import { useState } from "react"

const news = [
  {
    tag: "NVDA",
    title: "Nvidia surpasses $2T market cap as AI chip demand accelerates into Q3",
    source: "Reuters",
    time: "2 hours ago",
    tagColor: "#00ff88",
    tagBg: "rgba(0,255,136,0.08)",
  },
  {
    tag: "FED",
    title: "Federal Reserve signals cautious stance on rate cuts amid sticky inflation data",
    source: "Bloomberg",
    time: "4 hours ago",
    tagColor: "#378add",
    tagBg: "rgba(55,138,221,0.1)",
  },
  {
    tag: "BTC",
    title: "Bitcoin retests $68K resistance as institutional ETF inflows hit record weekly high",
    source: "CoinDesk",
    time: "6 hours ago",
    tagColor: "#f59e0b",
    tagBg: "rgba(245,158,11,0.1)",
  },
]

export default function News() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div style={{ padding: "0 32px 64px 32px" }}>

      {/* Label with live dot */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#00ff88",
          boxShadow: "0 0 6px #00ff88",
          animation: "pulse 2s infinite",
        }}/>
        <p style={{ color: "#00ff88", fontSize: "20px", letterSpacing: "1.5px" }}>
          FINANCE NEWS
        </p>
      </div>

      <h2 style={{ color: "white", fontSize: "30px", fontWeight: "700", marginBottom: "24px" }}>
        AI-Curated Market News
      </h2>

      <div style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(0,120,255,0.12)",
        borderRadius: "14px",
        padding: "8px 20px",
      }}>
        {news.map((n, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 10px",
              flexWrap: "wrap",
              borderBottom: i < news.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              background: hoveredIndex === i ? "rgba(255,255,255,0.02)" : "transparent",
              borderRadius: "10px",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
          >

            {/* Tag */}
            <span style={{
              fontSize: "15px",
              fontWeight: "600",
              color: n.tagColor,
              background: n.tagBg,
              borderRadius: "4px",
              padding: "3px 8px",
              whiteSpace: "nowrap",
              border: `1px solid ${n.tagColor}33`,
            }}>{n.tag}</span>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <p style={{
                color: hoveredIndex === i ? "white" : "#cbd5e1",
                fontSize: "15px", fontWeight: "500",
                lineHeight: "1.4", marginBottom: "4px",
                transition: "color 0.2s",
              }}>
                {n.title}
              </p>
              <p style={{ color: "#475569", fontSize: "11px" }}>
                {n.source} · {n.time}
              </p>
            </div>

            {/* Arrow - appears on hover */}
            <span style={{
              color: n.tagColor,
              fontSize: "18px",
              opacity: hoveredIndex === i ? 1 : 0,
              transform: hoveredIndex === i ? "translateX(0px)" : "translateX(-6px)",
              transition: "all 0.2s",
            }}>→</span>

          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>

    </div>
  )
}