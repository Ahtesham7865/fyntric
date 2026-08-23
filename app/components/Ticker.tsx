const stocks = [
  { sym: "AAPL", price: "$191.42", change: "+2.34%", up: true },
  { sym: "TSLA", price: "$248.17", change: "+1.87%", up: true },
  { sym: "NVDA", price: "$891.33", change: "+3.21%", up: true },
  { sym: "BTC", price: "$67,420", change: "+1.44%", up: true },
  { sym: "MSFT", price: "$415.90", change: "-0.32%", up: false },
  { sym: "NIFTY", price: "₹22,411", change: "+0.78%", up: true },
  { sym: "SENSEX", price: "₹73,842", change: "+0.61%", up: true },
  { sym: "GOOGL", price: "$168.34", change: "+0.93%", up: true },
]

export default function Ticker() {
  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(0,255,136,0.08)",
      borderBottom: "1px solid rgba(0,255,136,0.08)",
      padding: "20px 0px",
      background: "rgba(0,255,136,0.02)",
    }}>
      <div style={{
        display: "flex",
        gap: "0",
        animation: "ticker 20s linear infinite",
        width: "max-content",
      }}>
        {[...stocks, ...stocks, ...stocks, ].map((stock, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 30px",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}>
            <span style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "20px" }}>{stock.sym}</span>
            <span style={{ color: "#94a3b8", fontSize: "20px" }}>{stock.price}</span>
            <span style={{ color: stock.up ? "#00ff88" : "#f87171", fontSize: "19px" }}>{stock.change}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}