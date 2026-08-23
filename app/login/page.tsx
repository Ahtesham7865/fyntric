"use client"
import Navbar from "../components/Navbar"
import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handle = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setSuccess("Check your email to confirm signup!")
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push("/dashboard")
    }
    setLoading(false)
  }

  return (
    <div style={{ background: "#050a14", minHeight: "100vh" }}>
      <Navbar />
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "80vh", padding: "32px",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(0,255,136,0.15)",
          borderRadius: "20px", padding: "40px",
          width: "100%", maxWidth: "420px",
        }}>

          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 style={{ color: "white", fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              {isSignup ? "Join Fyntric for free" : "Login to your Fyntric account"}
            </p>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <p style={{ color: "#475569", fontSize: "12px", marginBottom: "6px", fontWeight: "500" }}>Email</p>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "12px 16px",
                color: "white", fontSize: "14px", outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <p style={{ color: "#475569", fontSize: "12px", marginBottom: "6px", fontWeight: "500" }}>Password</p>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handle()}
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "12px 16px",
                color: "white", fontSize: "14px", outline: "none",
              }}
            />
          </div>

          {/* Error / Success */}
          {error && (
            <div style={{
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.2)",
              borderRadius: "8px", padding: "10px 14px",
              color: "#f87171", fontSize: "13px", marginBottom: "16px",
            }}>{error}</div>
          )}
          {success && (
            <div style={{
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: "8px", padding: "10px 14px",
              color: "#00ff88", fontSize: "13px", marginBottom: "16px",
            }}>{success}</div>
          )}

          {/* Button */}
          <button onClick={handle} style={{
            width: "100%", background: "#00ff88",
            color: "#050a14", border: "none",
            padding: "13px", borderRadius: "10px",
            fontWeight: "700", fontSize: "15px",
            cursor: "pointer", marginBottom: "16px",
          }}>
            {loading ? "..." : isSignup ? "Create Account" : "Login"}
          </button>

          {/* Toggle */}
          <p style={{ textAlign: "center", fontSize: "13px", color: "#475569" }}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
              onClick={() => { setIsSignup(!isSignup); setError(""); setSuccess("") }}
              style={{ color: "#00ff88", cursor: "pointer", marginLeft: "6px", fontWeight: "600" }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>

        </div>
      </div>

      <style>{`input::placeholder { color: #334155; }`}</style>
    </div>
  )
}