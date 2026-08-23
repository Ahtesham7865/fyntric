"use client"
import { useState } from "react"

export default function AIAssistant() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "40px",
      padding: "64px 32px",
      alignItems: "center",
    }}>

      {/* Left Side */}
      <div>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}>
      <div style={{ 
        width: "6px", 
        height: "6px", 
        borderRadius: "50%", 
          background: "#00ff88",
          boxShadow: "0 0 6px #00ff88",
          animation: "pulse 2s infinite",}}>
            </div>
        <p style={{ color: "#00ff88", fontSize: "20px", letterSpacing: "1.5px", }}>
          AI ASSISTANT
        </p>
        </div>
        <h2 style={{ color: "white", fontSize: "32px", fontWeight: "700", marginBottom: "16px" }}>
          Ask Fyntric Anything
        </h2>
        <p style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.7", marginBottom: "24px" }}>
          Your personal AI finance teacher. Ask about stocks, strategies, market trends, or economic concepts — explained in plain language.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", }}>
          {["No login required", "Beginner-friendly explanations", "Live market context integrated", "Multi-language support"].map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredItem(i)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                transform: hoveredItem === i ? "scale(1.05) translateX(6px)" : "scale(1) translateX(0px)",
                transition: "all 0.2s",
                cursor: "default",
              }}>
              <span style={{
                color: "#00ff88",
                fontSize: hoveredItem === i ? "23px" : "19px",
                transition: "all 0.2s",
              }}>✓</span>
              <span style={{
                color: hoveredItem === i ? "white" : "#94a3b8",
                fontSize: hoveredItem === i ? "23px" : "19px",
                transition: "all 0.2s",
                fontWeight: hoveredItem === i ? "500" : "400",
              }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat */}
      <div style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(0,120,255,0.15)",
        borderRadius: "16px",
        padding: "20px",
      }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          marginBottom: "18px", paddingBottom: "14px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#378add" }}></div>
          <span style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "600" }}>Fyntric AI</span>
          <span style={{ color: "#378add", fontSize: "11px", marginLeft: "auto" }}>● Online</span>
        </div>

        {/* User Message 1 */}
        <div style={{ marginBottom: "14px", textAlign: "right" }}>
          <p style={{ fontSize: "10px", color: "#475569", marginBottom: "4px" }}>You</p>
          <span style={{
            display: "inline-block",
            background: "rgba(0,120,255,0.15)",
            border: "1px solid rgba(0,120,255,0.2)",
            borderRadius: "12px 12px 3px 12px",
            padding: "8px 13px", fontSize: "13px", color: "#bfdbfe",
          }}>What is a P/E ratio and why does it matter?</span>
        </div>

        {/* AI Message 1 */}
        <div style={{ marginBottom: "14px" }}>
          <p style={{ fontSize: "10px", color: "#475569", marginBottom: "4px" }}>Fyntric AI</p>
          <span style={{
            display: "inline-block",
            background: "rgba(0,255,136,0.06)",
            border: "1px solid rgba(0,255,136,0.12)",
            borderRadius: "3px 12px 12px 12px",
            padding: "8px 13px", fontSize: "13px", color: "#a7f3d0", lineHeight: "1.55",
          }}>The Price-to-Earnings (P/E) ratio compares a company's stock price to its annual earnings per share. A high P/E can mean investors expect strong growth, while a low P/E might suggest undervaluation — or slow growth ahead.</span>
        </div>

        {/* User Message 2 */}
        <div style={{ marginBottom: "14px", textAlign: "right" }}>
          <p style={{ fontSize: "10px", color: "#475569", marginBottom: "4px" }}>You</p>
          <span style={{
            display: "inline-block",
            background: "rgba(0,120,255,0.15)",
            border: "1px solid rgba(0,120,255,0.2)",
            borderRadius: "12px 12px 3px 12px",
            padding: "8px 13px", fontSize: "13px", color: "#bfdbfe",
          }}>Is NVDA a good buy right now?</span>
        </div>

        {/* AI Message 2 */}
        <div style={{ marginBottom: "14px" }}>
          <p style={{ fontSize: "10px", color: "#475569", marginBottom: "4px" }}>Fyntric AI</p>
          <span style={{
            display: "inline-block",
            background: "rgba(0,255,136,0.06)",
            border: "1px solid rgba(0,255,136,0.12)",
            borderRadius: "3px 12px 12px 12px",
            padding: "8px 13px", fontSize: "13px", color: "#a7f3d0", lineHeight: "1.55",
          }}>NVDA has strong fundamentals with AI chip demand surging. However at 55x P/E it's priced for perfection — any earnings miss could trigger a pullback. Consider your risk tolerance carefully.</span>
        </div>

        {/* Input */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "9px 12px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px", marginTop: "16px",
        }}>
          <span style={{ color: "#334155", fontSize: "12px", flex: 1 }}>Ask Fyntric AI…</span>
          <div style={{
            width: "28px", height: "28px", borderRadius: "7px",
            background: "rgba(0,255,136,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#00ff88",
          }}>→</div>
        </div>

      </div>
    </div>
  )
}