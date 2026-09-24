"use client"
import { useState } from "react"
import HeroChart from "./HeroChart"

export default function Hero() {
  const [loginHovered1, setLoginHovered1] = useState(false)
  const [loginHovered2, setLoginHovered2] = useState(false)

  return (
    <div style={{ textAlign: "center", padding: "25px 20px" }}>
      <h1 style={{
        fontSize: "65px", fontWeight: "700",
        color: "white", marginBottom: "20px"
      }}>
        Understand Market with <span style={{ color: "#00ff88" }}>AI</span>
      </h1>

      <p style={{
        fontSize: "22px", color: "#64748b",
        maxWidth: "520px", margin: "0 auto 32px auto",
      }}>
        Real-time stock insights, AI-powered financial explanation, and paper trading - all in one platform.
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => window.location.href = "/market"}
          onMouseEnter={() => setLoginHovered1(true)}
          onMouseLeave={() => setLoginHovered1(false)}
          style={{
            background: loginHovered1 ? "#00ff88" : "transparent",
            color: loginHovered1 ? "#050a14" : "white",
            transform: loginHovered1 ? "scale(1.05)" : "scale(1)",
            transition: "all 0.2s",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "12px 28px", borderRadius: "9px",
            fontWeight: "600", fontSize: "15px", cursor: "pointer",
          }}
        >Start Exploring</button>

        <button
          onClick={() => window.location.href = "/ai"}
          onMouseEnter={() => setLoginHovered2(true)}
          onMouseLeave={() => setLoginHovered2(false)}
          style={{
            background: loginHovered2 ? "#00ff88" : "transparent",
            color: loginHovered2 ? "#050a14" : "white",
            border: "1px solid rgba(255,255,255,0.2)",
            transform: loginHovered2 ? "scale(1.05)" : "scale(1)",
            transition: "all 0.2s",
            padding: "12px 28px", borderRadius: "9px",
            fontSize: "15px", cursor: "pointer",
          }}
        >Try AI Assistant</button>
      </div>

      <HeroChart />
    </div>
  )
}