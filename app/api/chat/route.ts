import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 })
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are Fyntric AI, a finance assistant. Answer in simple English.\n\nUser: ${message}` }] }]
      }),
    }
  )
  const data = await res.json()
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, try again!"
  return NextResponse.json({ reply })
}