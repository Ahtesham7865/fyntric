"use client"

import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY

const defaultIndian = [
  { name: "INFOSYS", symbol: "INFY" },
  { name: "WIPRO", symbol: "WIT" },
  { name: "HDFC BANK", symbol: "HDB" },
  { name: "DR REDDYS", symbol: "RDY" },
]

const defaultForeign = [
  { name: "APPLE", symbol: "AAPL" },
  { name: "NVIDIA", symbol: "NVDA" },
  { name: "TESLA", symbol: "TSLA" },
  { name: "MICROSOFT", symbol: "MSFT" },
]

export default function Market() {
  const router = useRouter()

  const [indianData, setIndianData] = useState<any>({})
  const [foreignData, setForeignData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // Fetch default stocks
  useEffect(() => {
    const fetchDefault = async () => {
      const results: any = {}

      await Promise.all(
        [...defaultIndian, ...defaultForeign].map(async (item) => {
          try {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=${API_KEY}`
            )

            const data = await res.json()

            results[item.symbol] = {
              ...data,
              name: item.name,
            }
          } catch (e) {
            results[item.symbol] = null
          }
        })
      )

      const indian: any = {}
      const foreign: any = {}

      defaultIndian.forEach((i) => {
        indian[i.symbol] = results[i.symbol]
      })

      defaultForeign.forEach((i) => {
        foreign[i.symbol] = results[i.symbol]
      })

      setIndianData(indian)
      setForeignData(foreign)
      setLoading(false)
    }

    fetchDefault()
  }, [])

  // Search stocks
  useEffect(() => {
    if (search.length < 2) {
      setSearchResults([])
      return
    }

    const timeout = setTimeout(async () => {
      setSearchLoading(true)

      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/search?q=${search}&token=${API_KEY}`
        )

        const data = await res.json()

        const top = data.result?.slice(0, 6) || []

        const withPrices = await Promise.all(
          top.map(async (item: any) => {
            try {
              const q = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=${API_KEY}`
              )

              const quote = await q.json()

              return {
                ...item,
                quote,
              }
            } catch (e) {
              return {
                ...item,
                quote: null,
              }
            }
          })
        )

        setSearchResults(withPrices)
      } catch (e) {
        setSearchResults([])
      }

      setSearchLoading(false)
    }, 600)

    return () => clearTimeout(timeout)
  }, [search])

  // Get percentage change
  const getChange = (data: any) => {
    if (!data || data.dp == null) return "N/A"

    return `${data.dp > 0 ? "+" : ""}${data.dp.toFixed(2)}%`
  }

  // Get price
  const getPrice = (data: any) => {
    if (!data || data.c == null) return "—"

    return `$${data.c.toLocaleString()}`
  }

  // Check whether stock is up
  const isUp = (data: any) => data?.dp >= 0

  return (
    <div
      style={{
        background: "#050a14",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div
        style={{
          padding: "64px 32px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00ff88",
              boxShadow: "0 0 6px #00ff88",
              animation: "pulse 2s infinite",
            }}
          />

          <p
            style={{
              color: "#00ff88",
              fontSize: "11px",
              letterSpacing: "1.5px",
            }}
          >
            LIVE MARKET
          </p>
        </div>

        <h1
          style={{
            color: "white",
            fontSize: "40px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Market Overview
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "15px",
            marginBottom: "40px",
          }}
        >
          Search any stock worldwide — real-time prices, no login required.
        </p>

        {/* Search */}
        <div
          style={{
            position: "relative",
            maxWidth: "600px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "14px 20px",
            }}
          >
            <span style={{ fontSize: "18px" }}>🔍</span>

            <input
              type="text"
              placeholder="Search any stock — AAPL, ZOMATO, RELIANCE..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "15px",
                flex: 1,
              }}
            />

            {search && (
              <span
                onClick={() => {
                  setSearch("")
                  setSearchResults([])
                }}
                style={{
                  color: "#475569",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ✕
              </span>
            )}
          </div>

          {/* Search Results */}
          {search.length >= 2 && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                left: 0,
                right: 0,
                background: "#0d1829",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                overflow: "hidden",
                zIndex: 100,
              }}
            >
              {searchLoading ? (
                <p
                  style={{
                    color: "#475569",
                    padding: "16px 20px",
                    fontSize: "13px",
                  }}
                >
                  ⏳ Searching...
                </p>
              ) : searchResults.length === 0 ? (
                <p
                  style={{
                    color: "#475569",
                    padding: "16px 20px",
                    fontSize: "13px",
                  }}
                >
                  No results found
                </p>
              ) : (
                searchResults.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => router.push(`/stock/${item.symbol}`)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 20px",
                      borderBottom:
                        i < searchResults.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    {/* Stock Info */}
                    <div>
                      <p
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {item.symbol}
                      </p>

                      <p
                        style={{
                          color: "#475569",
                          fontSize: "11px",
                        }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <p
                        style={{
                          color: "white",
                          fontSize: "13px",
                        }}
                      >
                        {item.quote?.c != null
                          ? `$${item.quote.c}`
                          : "—"}
                      </p>

                      <p
                        style={{
                          color:
                            item.quote?.dp >= 0
                              ? "#00ff88"
                              : "#f87171",
                          fontSize: "11px",
                        }}
                      >
                        {item.quote?.dp != null
                          ? `${item.quote.dp > 0 ? "+" : ""}${item.quote.dp.toFixed(
                              2
                            )}%`
                          : "—"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <p
            style={{
              color: "#475569",
              fontSize: "15px",
            }}
          >
            ⏳ Loading live market data...
          </p>
        ) : (
          <>
            {/* Indian Market */}
            <div
              style={{
                marginBottom: "48px",
              }}
            >
              <h2
                style={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                🇮🇳 Indian Market
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "14px",
                }}
              >
                {defaultIndian.map((item, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      router.push(`/stock/${item.symbol}`)
                    }
                    onMouseEnter={() => {
                      setHoveredIndex(i)
                      setHoveredSection("indian")
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null)
                      setHoveredSection(null)
                    }}
                    style={{
                      background:
                        hoveredSection === "indian" &&
                        hoveredIndex === i
                          ? "rgba(0,255,136,0.03)"
                          : "rgba(255,255,255,0.03)",

                      border:
                        hoveredSection === "indian" &&
                        hoveredIndex === i
                          ? "1px solid rgba(0,255,136,0.25)"
                          : "1px solid rgba(255,255,255,0.06)",

                      borderRadius: "14px",
                      padding: "20px",

                      transform:
                        hoveredSection === "indian" &&
                        hoveredIndex === i
                          ? "translateY(-2px)"
                          : "translateY(0)",

                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    <p
                      style={{
                        color: "#475569",
                        fontSize: "12px",
                        marginBottom: "8px",
                      }}
                    >
                      {item.name}
                    </p>

                    <p
                      style={{
                        color: "white",
                        fontSize: "22px",
                        fontWeight: "700",
                      }}
                    >
                      {getPrice(indianData[item.symbol])}
                    </p>

                    <p
                      style={{
                        color: isUp(indianData[item.symbol])
                          ? "#00ff88"
                          : "#f87171",
                        fontSize: "12px",
                        marginTop: "6px",
                      }}
                    >
                      {getChange(indianData[item.symbol])}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Market */}
            <div
              style={{
                marginBottom: "48px",
              }}
            >
              <h2
                style={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                🌍 Global Market
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "14px",
                }}
              >
                {defaultForeign.map((item, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      router.push(`/stock/${item.symbol}`)
                    }
                    onMouseEnter={() => {
                      setHoveredIndex(i)
                      setHoveredSection("foreign")
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null)
                      setHoveredSection(null)
                    }}
                    style={{
                      background:
                        hoveredSection === "foreign" &&
                        hoveredIndex === i
                          ? "rgba(55,138,221,0.05)"
                          : "rgba(255,255,255,0.03)",

                      border:
                        hoveredSection === "foreign" &&
                        hoveredIndex === i
                          ? "1px solid rgba(55,138,221,0.25)"
                          : "1px solid rgba(255,255,255,0.06)",

                      borderRadius: "14px",
                      padding: "20px",

                      transform:
                        hoveredSection === "foreign" &&
                        hoveredIndex === i
                          ? "translateY(-2px)"
                          : "translateY(0)",

                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    <p
                      style={{
                        color: "#475569",
                        fontSize: "12px",
                        marginBottom: "8px",
                      }}
                    >
                      {item.name}
                    </p>

                    <p
                      style={{
                        color: "white",
                        fontSize: "22px",
                        fontWeight: "700",
                      }}
                    >
                      {getPrice(foreignData[item.symbol])}
                    </p>

                    <p
                      style={{
                        color: isUp(foreignData[item.symbol])
                          ? "#00ff88"
                          : "#f87171",
                        fontSize: "12px",
                        marginTop: "6px",
                      }}
                    >
                      {getChange(foreignData[item.symbol])}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }

        input::placeholder {
          color: #334155;
        }
      `}</style>
    </div>
  )
}