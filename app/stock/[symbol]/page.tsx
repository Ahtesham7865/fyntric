"use client"
import Navbar from "../../components/Navbar"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY

export default function StockPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = params?.symbol as string
  const [quote, setQuote] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [user, setUser] = useState<any>(null)
  const [balance, setBalance] = useState(10000)
  const [tradeLoading, setTradeLoading] = useState(false)
  const [tradeMsg, setTradeMsg] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quoteRes, profileRes] = await Promise.all([
          fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`),
          fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`),
        ])
        setQuote(await quoteRes.json())
        setProfile(await profileRes.json())
      } catch (e) {}
      setLoading(false)
    }
    fetchData()

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data } = await supabase.from("portfolio").select("balance").eq("user_id", user.id).single()
        if (data) setBalance(data.balance)
        else {
          await supabase.from("portfolio").insert({ user_id: user.id, balance: 10000 })
          setBalance(10000)
        }
      }
    }
    getUser()
  }, [symbol])

  const executeTrade = async () => {
    if (!user) { router.push("/login"); return }
    setTradeLoading(true)
    setTradeMsg("")

    const price = quote?.c || 0
    const total = price * quantity

    if (action === "BUY" && total > balance) {
      setTradeMsg("❌ Insufficient balance!")
      setTradeLoading(false)
      return
    }

    const newBalance = action === "BUY" ? balance - total : balance + total

    await supabase.from("trades").insert({
      user_id: user.id,
      symbol,
      company_name: profile?.name || symbol,
      action,
      quantity,
      price,
      total,
    })

    await supabase.from("portfolio").update({ balance: newBalance }).eq("user_id", user.id)
    setBalance(newBalance)
    setTradeMsg(`✅ ${action} ${quantity} shares of ${symbol} @ $${price}`)
    setTradeLoading(false)
  }

  const isUp = quote?.dp >= 0

  return (
    <div style={{ background: "#050a14", minHeight: "100vh" }}>
      <Navbar />

      {loading ? (
        <div style={{ padding: "64px 32px" }}>
          <p style={{ color: "#475569" }}>⏳ Loading stock data...</p>
        </div>
      ) : (
        <div style={{ padding: "40px 32px" }}>

          <button onClick={() => router.back()} style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#94a3b8", fontSize: "13px",
            padding: "8px 16px", borderRadius: "8px",
            cursor: "pointer", marginBottom: "28px",
          }}>← Back</button>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                {profile?.logo && <img src={profile.logo} alt={symbol} style={{ width: "40px", height: "40px", borderRadius: "10px", background: "white", padding: "4px" }} />}
                <div>
                  <h1 style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{symbol}</h1>
                  <p style={{ color: "#475569", fontSize: "13px" }}>{profile?.name || "—"} · {profile?.exchange || "—"}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{ color: "white", fontSize: "40px", fontWeight: "700" }}>${quote?.c || "—"}</span>
                <span style={{ color: isUp ? "#00ff88" : "#f87171", fontSize: "18px", fontWeight: "500" }}>
                  {quote?.dp ? `${isUp ? "+" : ""}${quote.dp.toFixed(2)}%` : "—"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
              {user && (
                <div style={{
                  background: "rgba(0,255,136,0.06)",
                  border: "1px solid rgba(0,255,136,0.15)",
                  borderRadius: "10px", padding: "10px 16px",
                  fontSize: "13px", color: "#00ff88",
                }}>
                  💰 Balance: ${balance.toFixed(2)}
                </div>
              )}
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={() => { setAction("BUY"); setShowModal(true); setTradeMsg("") }} style={{
                  background: "#00ff88", color: "#050a14", border: "none",
                  padding: "12px 32px", borderRadius: "10px",
                  fontWeight: "700", fontSize: "16px", cursor: "pointer",
                }}>📈 Buy</button>
                <button onClick={() => { setAction("SELL"); setShowModal(true); setTradeMsg("") }} style={{
                  background: "transparent", color: "#f87171",
                  border: "1px solid #f87171", padding: "12px 32px",
                  borderRadius: "10px", fontWeight: "700",
                  fontSize: "16px", cursor: "pointer",
                }}>📉 Sell</button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "32px" }}>
            {[
              { label: "Open", value: `$${quote?.o || "—"}` },
              { label: "Prev Close", value: `$${quote?.pc || "—"}` },
              { label: "High", value: `$${quote?.h || "—"}` },
              { label: "Low", value: `$${quote?.l || "—"}` },
              { label: "Industry", value: profile?.finnhubIndustry || "—" },
              { label: "Country", value: profile?.country || "—" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px", padding: "14px 16px",
              }}>
                <p style={{ color: "#475569", fontSize: "11px", marginBottom: "6px" }}>{stat.label}</p>
                <p style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px", overflow: "hidden", marginBottom: "32px",
          }}>
            <iframe
              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview&symbol=${symbol}&interval=D&theme=dark&style=1&locale=en&hide_top_toolbar=0&save_image=0`}
              style={{ width: "100%", height: "500px", border: "none" }}
              allowFullScreen
            />
          </div>

          {/* Company Info */}
          {profile?.name && (
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px", padding: "24px",
            }}>
              <h3 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>About {profile.name}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                {[
                  { label: "Market Cap", value: profile.marketCapitalization ? `$${(profile.marketCapitalization / 1000).toFixed(2)}B` : "—" },
                  { label: "IPO Date", value: profile.ipo || "—" },
                  { label: "Shares Outstanding", value: profile.shareOutstanding ? `${profile.shareOutstanding.toFixed(2)}M` : "—" },
                  { label: "Website", value: profile.weburl || "—" },
                ].map((info, i) => (
                  <div key={i}>
                    <p style={{ color: "#475569", fontSize: "11px", marginBottom: "4px" }}>{info.label}</p>
                    <p style={{ color: "#e2e8f0", fontSize: "13px" }}>{info.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trade Modal */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 300,
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: "#0d1829",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "20px", padding: "40px",
            maxWidth: "400px", width: "100%",
            textAlign: "center",
          }} onClick={e => e.stopPropagation()}>

            {!user ? (
              <>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔐</div>
                <h2 style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>
                  Login to {action} {symbol}
                </h2>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>
                  Login to start paper trading with $10,000 virtual money!
                </p>
                <button onClick={() => router.push("/login")} style={{
                  background: "#00ff88", color: "#050a14", border: "none",
                  padding: "12px 32px", borderRadius: "10px",
                  fontWeight: "700", fontSize: "16px", cursor: "pointer", width: "100%",
                }}>Login to Continue</button>
              </>
            ) : (
              <>
                <h2 style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "6px" }}>
                  {action} {symbol}
                </h2>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
                  Current Price: <span style={{ color: "white", fontWeight: "600" }}>${quote?.c}</span>
                </p>

                <div style={{ marginBottom: "20px" }}>
                  <p style={{ color: "#475569", fontSize: "12px", marginBottom: "8px" }}>Quantity</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "white", width: "36px", height: "36px", borderRadius: "8px",
                      cursor: "pointer", fontSize: "18px",
                    }}>−</button>
                    <span style={{ color: "white", fontSize: "24px", fontWeight: "700", minWidth: "40px" }}>{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} style={{
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "white", width: "36px", height: "36px", borderRadius: "8px",
                      cursor: "pointer", fontSize: "18px",
                    }}>+</button>
                  </div>
                </div>

                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px", padding: "14px", marginBottom: "20px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#475569", fontSize: "13px" }}>Total Cost</span>
                    <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>${((quote?.c || 0) * quantity).toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#475569", fontSize: "13px" }}>Balance After</span>
                    <span style={{ color: action === "BUY" ? "#00ff88" : "#f87171", fontSize: "13px", fontWeight: "600" }}>
                      ${(action === "BUY" ? balance - (quote?.c || 0) * quantity : balance + (quote?.c || 0) * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {tradeMsg && (
                  <div style={{
                    background: tradeMsg.includes("❌") ? "rgba(248,113,113,0.08)" : "rgba(0,255,136,0.08)",
                    border: `1px solid ${tradeMsg.includes("❌") ? "rgba(248,113,113,0.2)" : "rgba(0,255,136,0.2)"}`,
                    borderRadius: "8px", padding: "10px", marginBottom: "16px",
                    color: tradeMsg.includes("❌") ? "#f87171" : "#00ff88", fontSize: "13px",
                  }}>{tradeMsg}</div>
                )}

                <button onClick={executeTrade} style={{
                  background: action === "BUY" ? "#00ff88" : "#f87171",
                  color: action === "BUY" ? "#050a14" : "white",
                  border: "none", padding: "13px 32px",
                  borderRadius: "10px", fontWeight: "700",
                  fontSize: "16px", cursor: "pointer", width: "100%", marginBottom: "10px",
                }}>
                  {tradeLoading ? "Processing..." : `Confirm ${action}`}
                </button>
                <button onClick={() => setShowModal(false)} style={{
                  background: "transparent", color: "#475569", border: "none",
                  fontSize: "13px", cursor: "pointer",
                }}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}