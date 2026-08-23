"use client"
import Navbar from "../components/Navbar"
import { useState } from "react"

export default function AIPage() {
  const [messages, setMessages] = useState<any[]>([
    { role: "ai", text: "Hello! I'm Fyntric AI 🤖 Ask me anything about stocks, investing, or finance!" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: "user", text: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: "ai", text: data.reply || "Sorry, try again!" }])
    } catch (e) {
      setMessages(prev => [...prev, { role: "ai", text: "Sorry, try again!" }])
    }
    setLoading(false)
  }

  return (
    <div style={{ background: "#050a14", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ padding: "40px 32px", flex: 1, maxWidth: "800px", margin: "0 auto", width: "100%" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#378add", boxShadow: "0 0 6px #378add",
            animation: "pulse 2s infinite",
          }}/>
          <p style={{ color: "#378add", fontSize: "11px", letterSpacing: "1.5px" }}>AI ASSISTANT</p>
        </div>
        <h1 style={{ color: "white", fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>
          Ask Fyntric AI
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "32px" }}>
          Ask anything about finance, stocks, investing, and markets!
        </p>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {["What is P/E ratio?", "Should I buy NVDA?", "What is SIP?", "How does inflation affect stocks?"].map((q, i) => (
            <button key={i}
              onClick={() => setInput(q)}
              style={{
                background: "rgba(55,138,221,0.08)",
                border: "1px solid rgba(55,138,221,0.2)",
                color: "#93c5fd", fontSize: "12px",
                padding: "6px 14px", borderRadius: "20px",
                cursor: "pointer",
              }}
            >{q}</button>
          ))}
        </div>

        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px", padding: "20px",
          minHeight: "400px", maxHeight: "500px",
          overflowY: "auto", marginBottom: "16px",
          display: "flex", flexDirection: "column", gap: "16px",
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
              <p style={{ fontSize: "10px", color: "#475569", marginBottom: "4px" }}>
                {msg.role === "user" ? "You" : "Fyntric AI"}
              </p>
              <span style={{
                display: "inline-block",
                background: msg.role === "user" ? "rgba(0,120,255,0.15)" : "rgba(0,255,136,0.06)",
                border: msg.role === "user" ? "1px solid rgba(0,120,255,0.2)" : "1px solid rgba(0,255,136,0.12)",
                borderRadius: msg.role === "user" ? "12px 12px 3px 12px" : "3px 12px 12px 12px",
                padding: "10px 14px", fontSize: "13px",
                color: msg.role === "user" ? "#bfdbfe" : "#a7f3d0",
                lineHeight: "1.6", maxWidth: "80%", textAlign: "left",
              }}>{msg.text}</span>
            </div>
          ))}
          {loading && (
            <div>
              <p style={{ fontSize: "10px", color: "#475569", marginBottom: "4px" }}>Fyntric AI</p>
              <span style={{
                display: "inline-block",
                background: "rgba(0,255,136,0.06)",
                border: "1px solid rgba(0,255,136,0.12)",
                borderRadius: "3px 12px 12px 12px",
                padding: "10px 14px", fontSize: "13px", color: "#a7f3d0",
              }}>⏳ Thinking...</span>
            </div>
          )}
        </div>

        <div style={{
          display: "flex", gap: "12px", alignItems: "center",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px", padding: "12px 16px",
        }}>
          <input
            type="text"
            placeholder="Ask anything — What is P/E ratio? Should I buy AAPL?"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            style={{
              background: "transparent", border: "none", outline: "none",
              color: "white", fontSize: "14px", flex: 1,
            }}
          />
          <button onClick={send} style={{
            background: loading ? "rgba(0,255,136,0.5)" : "#00ff88",
            color: "#050a14", border: "none",
            padding: "8px 20px", borderRadius: "8px",
            fontWeight: "700", cursor: "pointer", fontSize: "14px",
          }}>{loading ? "..." : "Send →"}</button>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        input::placeholder { color: #334155; }
      `}</style>
    </div>
  )
}