"use client"
import Navbar from "../components/Navbar"
import { useState, useEffect, useRef } from "react"

const categories = ["general", "forex", "crypto", "merger"]
const categoryLabels: Record<string, string> = {
  general: "Markets", forex: "Forex", crypto: "Crypto", merger: "M&A"
}

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts * 1000) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

const TICKERS = [
  { sym: "S&P 500", val: "5,248.49", chg: "+0.43%" },
  { sym: "NASDAQ", val: "16,742.39", chg: "-0.12%" },
  { sym: "BTC/USD", val: "67,420.00", chg: "+2.14%" },
  { sym: "ETH/USD", val: "3,214.80", chg: "+1.08%" },
  { sym: "EUR/USD", val: "1.0842", chg: "-0.06%" },
  { sym: "Gold", val: "2,318.40", chg: "+0.31%" },
  { sym: "Oil WTI", val: "79.42", chg: "-0.88%" },
  { sym: "DOW", val: "38,904.11", chg: "+0.28%" },
]

export default function News() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("general")
  const [breakingIdx, setBreakingIdx] = useState(0)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setNews([])
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/news?category=${category}&token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`
        )
        const data = await res.json()
        setNews(data.slice(0, 14))
      } catch (e) {}
      setLoading(false)
    }
    fetchNews()
  }, [category])

  const hero = news[0]
  const secondary = news.slice(1, 3)
  const trending = news.slice(3, 8)
  const rest = news.slice(8, 14)

  return (
    <div className="root">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .root {
          background: #050a14;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #c8d4e8;
          overflow-x: hidden;
        }
        .ticker-bar {
          background: rgba(255,255,255,0.015);
          border-bottom: 1px solid rgba(0,255,136,0.08);
          overflow: hidden;
          height: 36px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 10;
        }
        .ticker-label {
          background: #00ff88;
          color: #050a14;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2px;
          padding: 0 14px;
          height: 100%;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .ticker-track {
          display: flex;
          animation: scroll 40s linear infinite;
          flex-shrink: 0;
        }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 28px;
          border-right: 1px solid rgba(255,255,255,0.04);
          white-space: nowrap;
        }
        .ticker-sym { font-size: 10px; font-weight: 600; color: #475569; }
        .ticker-val { font-size: 11px; font-weight: 500; color: #c8d4e8; }
        .ticker-chg { font-size: 10px; font-weight: 500; }
        .up { color: #00ff88; }
        .dn { color: #f87171; }
        .cat-strip {
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          padding: 0 32px;
          background: rgba(5,10,20,0.9);
          backdrop-filter: blur(20px);
          overflow-x: auto;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .cat-strip::-webkit-scrollbar { display: none; }
        .cat-tab {
          background: transparent;
          border: none;
          color: #475569;
          padding: 14px 20px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .cat-tab::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: #00ff88;
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }
        .cat-tab.active { color: #e2e8f0; }
        .cat-tab.active::after { transform: scaleX(1); }
        .cat-tab:hover { color: #94a3b8; }
        .page-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }
        .masthead {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 40px 0 28px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
          gap: 16px;
        }
        .masthead-title {
          font-size: clamp(32px, 4vw, 54px);
          font-weight: 700;
          color: #e2e8f0;
          line-height: 1;
          letter-spacing: -2px;
        }
        .masthead-title em {
          font-style: italic;
          color: #00ff88;
        }
        .live-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(0,255,136,0.08);
          border: 1px solid rgba(0,255,136,0.2);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #00ff88;
          text-transform: uppercase;
        }
        .live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00ff88;
          animation: livepulse 1.4s ease-in-out infinite;
        }
        @keyframes livepulse {
          0% { box-shadow: 0 0 0 0 rgba(0,255,136,0.6); }
          70% { box-shadow: 0 0 0 7px rgba(0,255,136,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,255,136,0); }
        }
        .breaking-bar {
          display: flex;
          align-items: center;
          background: rgba(0,255,136,0.04);
          border: 1px solid rgba(0,255,136,0.12);
          border-radius: 6px;
          margin: 24px 0;
          overflow: hidden;
          height: 44px;
        }
        .breaking-label {
          background: #00ff88;
          color: #050a14;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2.5px;
          padding: 0 16px;
          height: 100%;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-transform: uppercase;
        }
        .breaking-text {
          padding: 0 20px;
          font-size: 12px;
          font-weight: 500;
          color: #a7f3d0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
        }
        .breaking-text:hover { color: #fff; }
        .breaking-nav {
          display: flex;
          align-items: center;
          gap: 1px;
          padding-right: 12px;
          flex-shrink: 0;
        }
        .breaking-btn {
          background: transparent;
          border: none;
          color: rgba(0,255,136,0.4);
          cursor: pointer;
          padding: 6px 8px;
          font-size: 14px;
          transition: color 0.2s;
        }
        .breaking-btn:hover { color: #00ff88; }
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          align-items: start;
        }
        .hero-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          display: block;
          text-decoration: none;
        }
        .hero-img-wrap {
          position: relative;
          height: 440px;
          overflow: hidden;
          border-radius: 12px;
        }
        .hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          filter: brightness(0.7);
        }
        .hero-card:hover .hero-img { transform: scale(1.04); }
        .hero-glass {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 28px;
          background: linear-gradient(to top, rgba(5,10,20,0.97) 0%, rgba(5,10,20,0.7) 50%, transparent 100%);
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,255,136,0.12);
          border: 1px solid rgba(0,255,136,0.25);
          border-radius: 4px;
          padding: 4px 10px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #00ff88;
          margin-bottom: 14px;
        }
        .hero-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: #00ff88; }
        .hero-headline {
          font-size: clamp(18px, 2.5vw, 26px);
          font-weight: 700;
          color: #f0f4ff;
          line-height: 1.3;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .hero-meta {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #334155;
          text-transform: uppercase;
        }
        .secondary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 16px;
        }
        .sec-card {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          display: block;
          text-decoration: none;
          height: 200px;
        }
        .sec-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          filter: brightness(0.65);
        }
        .sec-card:hover .sec-img { transform: scale(1.06); }
        .sec-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5,10,20,0.95) 0%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
        }
        .sec-source {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #334155;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .sec-headline {
          font-size: 13px;
          font-weight: 600;
          color: #d8e4f8;
          line-height: 1.35;
          transition: color 0.2s;
        }
        .sec-card:hover .sec-headline { color: #fff; }
        .sidebar { display: flex; flex-direction: column; gap: 20px; }
        .panel {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
        }
        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .panel-title {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #475569;
        }
        .panel-badge {
          background: rgba(0,255,136,0.08);
          border: 1px solid rgba(0,255,136,0.15);
          border-radius: 100px;
          padding: 2px 8px;
          font-size: 9px;
          font-weight: 700;
          color: #00ff88;
        }
        .trend-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          text-decoration: none;
          transition: background 0.2s;
          cursor: pointer;
          position: relative;
        }
        .trend-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #00ff88;
          transform: scaleY(0);
          transition: transform 0.25s ease;
        }
        .trend-item:hover { background: rgba(0,255,136,0.03); }
        .trend-item:hover::before { transform: scaleY(1); }
        .trend-item:last-child { border-bottom: none; }
        .trend-rank {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.08);
          width: 18px;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .trend-thumb {
          width: 52px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .trend-content { flex: 1; min-width: 0; }
        .trend-headline {
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          line-height: 1.4;
          transition: color 0.2s;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .trend-item:hover .trend-headline { color: #c8d4e8; }
        .trend-meta {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #1e2e42;
          text-transform: uppercase;
          margin-top: 5px;
        }
        .market-glass {
          background: rgba(0,255,136,0.03);
          border: 1px solid rgba(0,255,136,0.1);
          border-radius: 12px;
          padding: 18px;
        }
        .market-title {
          font-size: 9px; font-weight: 800; letter-spacing: 2.5px;
          text-transform: uppercase; color: #1e3a2a; margin-bottom: 14px;
        }
        .market-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .market-row:last-child { border-bottom: none; }
        .market-sym { font-size: 11px; font-weight: 600; color: #475569; }
        .market-val { font-size: 11px; color: #94a3b8; }
        .market-chg {
          font-size: 10px; font-weight: 600;
          padding: 2px 7px; border-radius: 3px;
        }
        .market-chg.up { background: rgba(0,255,136,0.1); color: #00ff88; }
        .market-chg.dn { background: rgba(248,113,113,0.1); color: #f87171; }
        .bottom-section { margin-top: 40px; }
        .section-header {
          display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
        }
        .section-header-title {
          font-size: 9px; font-weight: 800; letter-spacing: 3px;
          text-transform: uppercase; color: #1e2e42;
        }
        .section-header-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(0,255,136,0.1), transparent);
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          overflow: hidden;
        }
        .grid-card {
          background: #050a14;
          padding: 20px;
          display: block;
          text-decoration: none;
          transition: background 0.2s;
          position: relative;
        }
        .grid-card:hover { background: rgba(0,255,136,0.02); }
        .grid-thumb-wrap {
          height: 130px; border-radius: 8px; overflow: hidden; margin-bottom: 14px;
          position: relative;
        }
        .grid-thumb {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
          filter: brightness(0.7);
        }
        .grid-card:hover .grid-thumb { transform: scale(1.07); }
        .grid-rank-badge {
          position: absolute;
          top: 8px; left: 8px;
          background: rgba(5,10,20,0.8);
          border: 1px solid rgba(0,255,136,0.15);
          border-radius: 4px;
          padding: 3px 8px;
          font-size: 10px; font-weight: 600; color: #00ff88;
        }
        .grid-source {
          font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #1e2e42; margin-bottom: 8px;
        }
        .grid-headline {
          font-size: 13px; font-weight: 500; line-height: 1.5;
          color: #475569; transition: color 0.2s;
        }
        .grid-card:hover .grid-headline { color: #c8d4e8; }
        .grid-time {
          font-size: 10px; color: #1e2e42; margin-top: 10px; font-weight: 500;
        }
        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%);
          background-size: 400% 100%;
          animation: shim 1.6s ease-in-out infinite;
          border-radius: 8px;
        }
        @keyframes shim {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .secondary-grid { grid-template-columns: 1fr !important; }
          .hero-img-wrap { height: 300px !important; }
        }
        @media (max-width: 600px) {
          .page-wrap { padding: 0 16px 60px !important; }
          .cat-strip { padding: 0 16px !important; }
        }
      `}</style>

      <Navbar />

      <div className="ticker-bar">
        <div className="ticker-label">LIVE</div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
          <div className="ticker-track">
            {[...TICKERS, ...TICKERS].map((t, i) => (
              <div className="ticker-item" key={i}>
                <span className="ticker-sym">{t.sym}</span>
                <span className="ticker-val">{t.val}</span>
                <span className={`ticker-chg ${t.chg.startsWith("+") ? "up" : "dn"}`}>{t.chg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cat-strip">
        {categories.map((cat) => (
          <button key={cat} className={`cat-tab ${category === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="page-wrap">
        <div className="masthead">
          <h1 className="masthead-title">Market <em>Intelligence</em></h1>
          <div className="live-pill"><div className="live-dot" />Live Updates</div>
        </div>

        {!loading && news.length > 0 && (
          <div className="breaking-bar">
            <div className="breaking-label">⚡ Breaking</div>
            <a href={news[breakingIdx]?.url} target="_blank" rel="noopener noreferrer" className="breaking-text">
              {news[breakingIdx]?.headline}
            </a>
            <div className="breaking-nav">
              <button className="breaking-btn" onClick={() => setBreakingIdx(i => Math.max(0, i - 1))}>‹</button>
              <span style={{ fontSize: "9px", color: "#1e2e42" }}>{breakingIdx + 1}/{Math.min(5, news.length)}</span>
              <button className="breaking-btn" onClick={() => setBreakingIdx(i => Math.min(4, i + 1))}>›</button>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", marginTop: "16px" }}>
            <div>
              <div style={{ height: "440px" }} className="shimmer" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                <div style={{ height: "200px" }} className="shimmer" />
                <div style={{ height: "200px" }} className="shimmer" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[1,2,3,4,5].map(i => <div key={i} style={{ height: "72px" }} className="shimmer" />)}
            </div>
          </div>
        ) : (
          <>
            <div className="main-grid" style={{ marginTop: "0" }}>
              <div>
                {hero && (
                  <a href={hero.url} target="_blank" rel="noopener noreferrer" className="hero-card">
                    <div className="hero-img-wrap">
                      {hero.image
                        ? <img src={hero.image} alt={hero.headline} className="hero-img" />
                        : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#050a14,#0d1f3c)" }} />
                      }
                    </div>
                    <div className="hero-glass">
                      <div className="hero-tag"><div className="hero-tag-dot" />Featured Story</div>
                      <h2 className="hero-headline">{hero.headline}</h2>
                      <p className="hero-meta">{hero.source} · {timeAgo(hero.datetime)}</p>
                    </div>
                  </a>
                )}
                <div className="secondary-grid">
                  {secondary.map((item, i) => (
                    <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="sec-card">
                      {item.image
                        ? <img src={item.image} alt={item.headline} className="sec-img" />
                        : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#050a14,#0d2010)" }} />
                      }
                      <div className="sec-overlay">
                        <p className="sec-source">{item.source} · {timeAgo(item.datetime)}</p>
                        <p className="sec-headline">{item.headline}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="sidebar">
                <div className="market-glass">
                  <p className="market-title">Market Snapshot</p>
                  {TICKERS.slice(0, 5).map((t, i) => (
                    <div className="market-row" key={i}>
                      <span className="market-sym">{t.sym}</span>
                      <span className="market-val">{t.val}</span>
                      <span className={`market-chg ${t.chg.startsWith("+") ? "up" : "dn"}`}>{t.chg}</span>
                    </div>
                  ))}
                </div>
                <div className="panel">
                  <div className="panel-header">
                    <span className="panel-title">🔥 Trending Now</span>
                    <span className="panel-badge">{trending.length} stories</span>
                  </div>
                  {trending.map((item, i) => (
                    <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="trend-item">
                      <span className="trend-rank">{i < 2 ? "🔥" : `0${i+1}`}</span>
                      {item.image && <img src={item.image} alt="" className="trend-thumb" />}
                      <div className="trend-content">
                        <p className="trend-headline">{item.headline}</p>
                        <p className="trend-meta">{item.source} · {timeAgo(item.datetime)}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {rest.length > 0 && (
              <div className="bottom-section">
                <div className="section-header">
                  <span className="section-header-title">More Stories</span>
                  <div className="section-header-line" />
                </div>
                <div className="grid-3">
                  {rest.map((item, i) => (
                    <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="grid-card">
                      <div className="grid-thumb-wrap">
                        {item.image
                          ? <img src={item.image} alt="" className="grid-thumb" />
                          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#050a14,#0d2010)" }} />
                        }
                        <div className="grid-rank-badge">#{i+9}</div>
                      </div>
                      <p className="grid-source">{item.source} · {timeAgo(item.datetime)}</p>
                      <p className="grid-headline">{item.headline}</p>
                      <p className="grid-time">{timeAgo(item.datetime)}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}