export default function HeroChart() {
  return (
    <div style={{
      maxWidth: "1100px",
      width:"100%",
      margin: "35px auto",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(0,255,136,0.1)",
      borderRadius: "16px",
      overflow: "hidden",
    }}>

      {/* Chart Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div>
          <p style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "500" }}>AAPL — Apple Inc.</p>
          <p style={{ color: "#475569", fontSize: "11px" }}>NASDAQ · 1D · Live</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ color: "white", fontSize: "22px", fontWeight: "700" }}>$191.42</p>
          <p style={{ color: "#00ff88", fontSize: "12px" }}>▲ +2.34%</p>
        </div>
      </div>

      {/* Chart SVG */}
      <svg viewBox="0 0 740 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
        <defs>
          <linearGradient id="grd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        <line x1="0" y1="40" x2="740" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <line x1="0" y1="80" x2="740" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <line x1="0" y1="120" x2="740" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

        {/* Price Labels */}
        <text x="8" y="37" fill="#334155" fontSize="9" fontFamily="Inter">194</text>
        <text x="8" y="77" fill="#334155" fontSize="9" fontFamily="Inter">191</text>
        <text x="8" y="117" fill="#334155" fontSize="9" fontFamily="Inter">188</text>

        {/* Area Fill */}
        <path d="M 30 110 C 90 95 150 80 210 65 C 270 50 330 54 390 42 C 450 30 510 38 570 35 C 610 32 670 20 730 15 L 730 150 L 30 150 Z" fill="url(#grd)"/>

        {/* Line */}
        <path d="M 30 110 C 90 95 150 80 210 65 C 270 50 330 54 390 42 C 450 30 510 38 570 35 C 610 32 670 20 730 15" stroke="#00ff88" strokeWidth="2" strokeLinecap="round"/>

        {/* Current Price Dot */}
        <circle cx="730" cy="15" r="4" fill="#00ff88"/>
        <circle cx="730" cy="15" r="8" fill="#00ff88" fillOpacity="0.15"/>

        {/* Time Labels */}
        <text x="28" y="158" fill="#334155" fontSize="9" fontFamily="Inter">9:30</text>
        <text x="178" y="158" fill="#334155" fontSize="9" fontFamily="Inter">11:00</text>
        <text x="368" y="158" fill="#334155" fontSize="9" fontFamily="Inter">13:00</text>
        <text x="558" y="158" fill="#334155" fontSize="9" fontFamily="Inter">15:00</text>
        <text x="698" y="158" fill="#334155" fontSize="9" fontFamily="Inter">16:00</text>
      </svg>

    </div>
  )
}