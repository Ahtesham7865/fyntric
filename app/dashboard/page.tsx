"use client"
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState(10000)
  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login"); return }
      setUser(user)

      const { data: portfolio } = await supabase
        .from("portfolio")
        .select("balance")
        .eq("user_id", user.id)
        .single()
      if (portfolio) setBalance(portfolio.balance)

      const { data: tradesData } = await supabase
        .from("trades")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
      if (tradesData) setTrades(tradesData)

      setLoading(false)
    }
    getData()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const totalInvested = trades.filter(t => t.action === "BUY").reduce((sum, t) => sum + t.total, 0)
  const totalSold = trades.filter(t => t.action === "SELL").reduce((sum, t) => sum + t.total, 0)
  const pnl = totalSold - totalInvested + (balance - 10000)

  if (loading) return (
    <div style={{ background: "#050a14", minHeight: "100vh" }}>
      <Navbar />
      <p style={{ color: "#475569", padding: "64px 32px" }}>⏳ Loading...</p>
    </div>
  )

  return (
    <div style={{ background: "#050a14", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "48px 32px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 6px #00ff88" }}/>
              <p style={{ color: "#00ff88", fontSize: "11px", letterSpacing: "1.5px" }}>DASHBOARD</p>
            </div>
            <h1 style={{ color: "white", fontSize: "32px", fontWeight: "700" }}>Welcome back! 👋</h1>
            <p style={{ color: "#475569", fontSize: "14px", marginTop: "4px" }}>{user?.email}</p>
          </div>
          <button onClick={logout} style={{
            background: "transparent", color: "#f87171",
            border: "1px solid rgba(248,113,113,0.3)",
            padding: "8px 20px", borderRadius: "8px",
            cursor: "pointer", fontSize: "13px", fontWeight: "600",
          }}>Logout</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Virtual Balance", value: `$${balance.toFixed(2)}`, change: "Available cash", up: true },
            { label: "Total P&L", value: `${pnl >= 0 ? "+" : ""}$${pnl.toFixed(2)}`, change: pnl >= 0 ? "Profit" : "Loss", up: pnl >= 0 },
            { label: "Total Trades", value: `${trades.length}`, change: `${trades.filter(t => t.action === "BUY").length} buys · ${trades.filter(t => t.action === "SELL").length} sells`, up: true },
            { label: "Total Invested", value: `$${totalInvested.toFixed(2)}`, change: "Paper money used", up: true },
          ].map((card, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px", padding: "20px",
            }}>
              <p style={{ color: "#475569", fontSize: "12px", marginBottom: "8px" }}>{card.label}</p>
              <p style={{ color: card.up ? "white" : "#f87171", fontSize: "24px", fontWeight: "700" }}>{card.value}</p>
              <p style={{ color: card.up ? "#00ff88" : "#f87171", fontSize: "12px", marginTop: "6px" }}>{card.change}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: "rgba(0,255,136,0.03)",
          border: "1px solid rgba(0,255,136,0.12)",
          borderRadius: "16px", padding: "32px",
          textAlign: "center", marginBottom: "32px",
        }}>
          <h2 style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>
            {trades.length === 0 ? "Start Paper Trading 📈" : "Continue Trading 📈"}
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
            Practice trading with virtual money — no risk, real market prices!
          </p>
          <button onClick={() => router.push("/market")} style={{
            background: "#00ff88", color: "#050a14", border: "none",
            padding: "12px 32px", borderRadius: "10px",
            fontWeight: "700", fontSize: "15px", cursor: "pointer",
          }}>Go to Market →</button>
        </div>

        {/* Recent Trades */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px", padding: "24px",
        }}>
          <h3 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>
            Recent Trades
          </h3>

          {trades.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ fontSize: "40px", marginBottom: "12px" }}>📊</p>
              <p style={{ color: "#475569", fontSize: "14px" }}>No trades yet — make your first paper trade!</p>
              <button onClick={() => router.push("/market")} style={{
                background: "transparent", color: "#00ff88",
                border: "1px solid rgba(0,255,136,0.2)",
                padding: "8px 20px", borderRadius: "8px",
                cursor: "pointer", fontSize: "13px", marginTop: "16px", fontWeight: "600",
              }}>Browse Market</button>
            </div>
          ) : (
            <div>
              {/* Table Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "12px", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "8px" }}>
                {["Symbol", "Action", "Qty", "Price", "Total"].map((h, i) => (
                  <p key={i} style={{ color: "#334155", fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</p>
                ))}
              </div>
              {trades.map((trade, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "12px",
                  padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.03)",
                }}>
                  <p style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "600" }}>{trade.symbol}</p>
                  <p style={{ color: trade.action === "BUY" ? "#00ff88" : "#f87171", fontSize: "13px", fontWeight: "600" }}>{trade.action}</p>
                  <p style={{ color: "#94a3b8", fontSize: "13px" }}>{trade.quantity}</p>
                  <p style={{ color: "#94a3b8", fontSize: "13px" }}>${trade.price.toFixed(2)}</p>
                  <p style={{ color: "#94a3b8", fontSize: "13px" }}>${trade.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}